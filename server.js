const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/error');
const cookieParser = require('cookie-parser');

const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');

// custom logger
// const logger = require('./middleware/logger');

// util logger
const morgan = require('morgan');

// db
const connectDB = require('./config/db');

// colors
const colors = require('colors');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Route files
const coins = require('./routes/coins');
const transactions = require('./routes/transactions');
const invoices = require('./routes/invoices');
const users = require('./routes/users');
const auth = require('./routes/auth');

const app = express();

// Body Parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
// app.use(logger);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  window: 10 * 60 * 1000, // 10 minutes
  max: 100 // number of requests per 10 minutes.
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routes
app.use('/api/v1/coins', coins);
app.use('/api/v1/transactions', transactions);
app.use('/api/v1/invoices', invoices);
app.use('/api/v1/users', users);
app.use('/api/v1/auth', auth);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
