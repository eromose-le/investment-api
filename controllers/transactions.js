const Transaction = require('../models/Transaction');

// @desc    Get all transactions
// @route   GET /api/v1/transactions
// @access  Private
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json({
      success: true,
      msg: 'Fetched all transactions',
      count: transactions.length,
      data: transactions
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Get single transaction
// @route   GET /api/v1/transactions/:id
// @access  Private
exports.getTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({
      success: true,
      msg: `Fetched transaction ${req.params.id}`,
      data: transaction
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Create new transaction
// @route   POST /api/v1/transactions
// @access  Private
exports.createTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.create(req.body);
    console.log(transaction);
    res.status(201).json({
      success: true,
      msg: 'Createed new transaction',
      data: transaction
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Update transaction
// @route   PUT /api/v1/transactions/:id
// @access  Private
exports.updateTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!transaction) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({
      success: true,
      msg: `Updated transaction ${req.params.id}`,
      data: transaction
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Delete transaction
// @route   DELETE /api/v1/transactions/:id
// @access  Private
exports.deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findByIdAndRemove(req.params.id);

    if (!transaction) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({
      success: true,
      msg: `Deleted transaction ${req.params.id}`,
      data: {}
    });
  } catch (err) {
    return res.status(400).json({ success: false });
  }
};
