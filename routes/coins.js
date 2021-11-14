const express = require('express');
const {
  getCoins,
  getCoin,
  createCoin,
  updateCoin,
  deleteCoin
} = require('../controllers/coins');

const Coin = require('../models/Coin');
const advancedResults = require('../middleware/advancedResults');

// Include other resource routers
const transactionRouter = require('./transactions');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Re-route into other resource routers
router.use('/:coinId/transactions', transactionRouter);

router
  .route('/')
  .get(advancedResults(Coin, 'transactions'), getCoins)
  .post(protect, authorize('developer'), createCoin);

router
  .route('/:id')
  .get(getCoin)
  .put(protect, authorize('developer'), updateCoin)
  .delete(protect, authorize('developer'), deleteCoin);

module.exports = router;
