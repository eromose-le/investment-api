const express = require('express');
const {
  getInvestments,
  getInvestment,
  createInvestment,
  updateInvestment,
  deleteInvestment
} = require('../controllers/investments');

const Investment = require('../models/Investment');
const advancedResults = require('../middleware/advancedResults');

// Include other resource routers
// const transactionRouter = require('./transactions');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Re-route into other resource routers
// router.use('/:coinId/transactions', transactionRouter);

router
  .route('/')
  .get(advancedResults(Investment), getInvestments)
  .post(createInvestment);

router
  .route('/:id')
  .get(getInvestment)
  .put(protect, authorize('admin'), updateInvestment)
  .delete(protect, authorize('admin'), deleteInvestment);

module.exports = router;
