const express = require('express');
const {
  getWallets,
  getWallet,
  createWallet,
  updateWallet,
  deleteWallet
} = require('../controllers/wallets');

const Wallet = require('../models/Wallet');
const advancedResults = require('../middleware/advancedResults');

// Include other resource routers
// const transactionRouter = require('./transactions');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Re-route into other resource routers
// router.use('/:coinId/transactions', transactionRouter);

router
  .route('/')
  .get(advancedResults(Wallet, 'user'), protect, getWallets)
  .post(protect, authorize('admin'), createWallet);

router
  .route('/:id')
  .get(protect, authorize('user', 'admin'), getWallet)
  .put(protect, authorize('admin'), updateWallet)
  .delete(protect, authorize('admin'), deleteWallet);

module.exports = router;
