const arcjet = require("@arcjet/node").default;
const { shield, detectBot, tokenBucket } = require("@arcjet/node");
const logger = require("../utils/logger");
const ApiError = require("../utils/apiError");
const { StatusCodes } = require("http-status-codes");

// Initialize Arcjet
const aj = arcjet({
  key: process.env.ARCJET_KEY, // Get your key from https://app.arcjet.com
  characteristics: ["ip.src"], // Track requests by IP address
  rules: [
    // Shield protects against common attacks like SQL injection and XSS
    shield({
      mode: "LIVE",
    }),
    // Bot detection
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"], // Allow search engines
    }),
    // General rate limiting using tokenBucket algorithm
    tokenBucket({
      mode: "LIVE",
      refillRate: 5, // 5 requests
      interval: 60, // per 60 seconds
      capacity: 10, // maximum of 10 requests
    }),
  ],
});

const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        throw new ApiError(StatusCodes.TOO_MANY_REQUESTS, "Too many requests");
      } else if (decision.reason.isBot()) {
        throw new ApiError(StatusCodes.FORBIDDEN, "No bots allowed");
      } else {
        throw new ApiError(StatusCodes.FORBIDDEN, "Forbidden");
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = arcjetMiddleware;
