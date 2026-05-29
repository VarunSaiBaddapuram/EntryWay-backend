require('express-async-errors');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dns = require('dns');
const logger = require('./utils/logger');
const errorHandler = require('./middleware/errorHandler');
const arcjetMiddleware = require('./middleware/arcjet');

dns.setServers(['1.1.1.1', '8.8.8.8']);
require('./db/conn');

const authRouter = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Global security middleware
if (process.env.ARCJET_KEY) {
  app.use(arcjetMiddleware);
} else {
  logger.warn('ARCJET_KEY not found. Skipping Arcjet security layer.');
}

app.set('view engine', 'ejs');
app.set('views', './public/views');

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/', authRouter);

// Global Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});