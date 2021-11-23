const express = require('express');
const {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction
} = require('../controllers/transactions');

// Bring in model
const Transaction = require('../models/Transaction');
const advancedResults = require('../middleware/advancedResults');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(
    protect,
    advancedResults(Transaction, {
      path: 'coin',
      select: 'coin abbr'
    }),
    getTransactions
  )
  .post(protect, createTransaction);
router
  .route('/:id')
  .get(protect, advancedResults(Transaction, 'coin'), getTransaction)
  .put(protect, authorize('developer', 'admin'), updateTransaction)
  .delete(protect, authorize('developer', 'admin'), deleteTransaction);

module.exports = router;
