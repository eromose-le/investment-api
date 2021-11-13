const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Transaction = require('../models/Transaction');

// @desc    Get all transactions
// @route   GET /api/v1/transactions
// @route   GET /api/v1/coins/:coinId/transactions
// @access  Private
exports.getTransactions = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.coinId) {
    query = Transaction.find({ coin: req.params.coinId });
  } else {
    query = Transaction.find();
  }

  const transactions = await query;

  res.status(200).json({
    success: true,
    count: transactions.length,
    data: transactions
  });
});

// @desc    Get single transaction
// @route   GET /api/v1/transactions/:id
// @access  Private
exports.getTransaction = asyncHandler(async (req, res, next) => {
  const transaction = await Transaction.findById(req.params.id);

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
// @access  Private
exports.createTransaction = asyncHandler(async (req, res, next) => {
  const transaction = await Transaction.create(req.body);
  console.log(transaction);
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
  const transaction = await Transaction.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

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
    msg: `Updated transaction ${req.params.id}`,
    data: transaction
  });
});

// @desc    Delete transaction
// @route   DELETE /api/v1/transactions/:id
// @access  Private
exports.deleteTransaction = asyncHandler(async (req, res, next) => {
  const transaction = await Transaction.findByIdAndRemove(req.params.id);

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
    msg: `Deleted transaction ${req.params.id}`,
    data: {}
  });
});
