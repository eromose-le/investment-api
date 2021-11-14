const express = require('express');
const {
  getInvoices,
  getInvoice,
  createInvoice,
  updateInvoice,
  deleteInvoice
} = require('../controllers/invoices');

const Invoice = require('../models/Invoice');
const advancedResults = require('../middleware/advancedResults');

// Include other resource routers
// const transactionRouter = require('./transactions');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Re-route into other resource routers
// router.use('/:coinId/transactions', transactionRouter);

router
  .route('/')
  .get(advancedResults(Invoice, 'user'), protect, getInvoices)
  .post(protect, authorize('admin'), createInvoice);

router
  .route('/:id')
  .get(getInvoice)
  .put(protect, authorize('admin'), updateInvoice)
  .delete(protect, authorize('admin'), deleteInvoice);

module.exports = router;
