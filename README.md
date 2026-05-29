# EntryWay - Backend

The backend for the EntryWay Monument & Museum Ticketing System.
Built using Node.js and Express, this REST API handles user authentication, ticket bookings, QR code validation, and site management.

## 🚀 Technologies Used
- **Node.js & Express.js**: Server framework and routing.
- **MongoDB & Mongoose**: NoSQL database and ODM for data modeling.
- **Zod**: For robust API request validation.
- **Arcjet**: For security features including rate limiting and bot protection.
- **Pino**: For structured, production-ready logging.
- **JSON Web Tokens (JWT)**: For secure authentication and authorization.
- **Bcryptjs**: For password hashing.

## 🛠️ Setup Instructions
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Create a `config.env` file in the `server` directory and add the following environment variables:
   ```env
   PORT=5000
   DATABASE=<your_mongodb_connection_string>
   SECRET_KEY=<your_jwt_secret_key>
   ARCJET_KEY=<your_arcjet_key>
   LOG_LEVEL=info
   ```
4. Start the development server:
   ```bash
   npm start
   ```

The server will be available at `http://localhost:5000`.

## 📁 Project Architecture
The backend follows a standard Layered Architecture:
- `controllers/`: Contains the core business logic for processing requests.
- `routes/`: Defines the API endpoints and maps them to controllers.
- `middleware/`: Contains global error handling, authentication, and security (Arcjet) middlewares.
- `model/`: Mongoose schemas for Users, Sites, Bookings, and QR data.
- `validations/`: Zod schemas to ensure all incoming data is valid.
- `utils/`: Utility functions and configuration like the Pino logger.
