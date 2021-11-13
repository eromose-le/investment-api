const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Transaction = require('../models/Transaction');
const Coin = require('../models/Coin');

// @desc    Get all transactions
// @route   GET /api/v1/transactions
// @route   GET /api/v1/coins/:coinId/transactions
// @access  Private
exports.getTransactions = asyncHandler(async (req, res, next) => {
  if (req.params.coinId) {
    // get single transaction
    const transactions = await Transaction.find({ coin: req.params.coinId });

    // with pagination
    // return res.status(200).json(res.advancedResults);

    // without pagination
    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } else {
    // get all transactions
    res.status(200).json(res.advancedResults);
  }
});

// @desc    Get single transaction
// @route   GET /api/v1/transactions/:id
// @access  Private
exports.getTransaction = asyncHandler(async (req, res, next) => {
  const transaction = await Transaction.findById(req.params.id).populate({
    path: 'coin',
    select: 'name abbr'
  });

  if (!transaction) {
    return next(
      new ErrorResponse(
        `Transaction not found with id of ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({
    success: true,
    data: transaction
  });
});

// @desc    Create new transaction
// @route   POST /api/v1/transactions
// @route   POST /api/v1/coins/:coinsId/transactions
// @access  Private
exports.createTransaction = asyncHandler(async (req, res, next) => {
  req.body.coin = req.params.coinId;

  const coin = await Coin.findById(req.params.coinId);

  if (!coin) {
    return next(
      new ErrorResponse(`Coin not found with id of ${req.params.coinId}`, 404)
    );
  }

  const transaction = await Transaction.create(req.body);

  res.status(201).json({
    success: true,
    msg: 'Createed new transaction',
    data: transaction
  });
});

// @desc    Update transaction
// @route   PUT /api/v1/transactions/:id
// @access  Private
exports.updateTransaction = asyncHandler(async (req, res, next) => {
  let transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    return next(
      new ErrorResponse(
        `Transaction not found with id of ${req.params.id}`,
        404
      )
    );
  }

  transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: transaction
  });
});

// @desc    Delete transaction
// @route   DELETE /api/v1/transactions/:id
// @access  Private
exports.deleteTransaction = asyncHandler(async (req, res, next) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    return next(
      new ErrorResponse(
        `Transaction not found with id of ${req.params.id}`,
        404
      )
    );
  }

  await transaction.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
