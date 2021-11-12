const express = require('express');
const dotenv = require('dotenv');

// custom logger
const logger = require('./middleware/logger');
// util logger
const morgan = require('morgan');

// Route files
const transactions = require('./routes/transactions');

// Load env vars
dotenv.config({ path: './config/config.env' });

const app = express();

// Dev logging middleware
// app.use(logger);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routes
app.use('/api/v1/transactions', transactions);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
