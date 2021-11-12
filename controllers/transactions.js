// @desc    Get all transactions
// @route   GET /api/v1/transactions
// @access  Private
exports.getTransactions = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show all transactions' });
};

// @desc    Get single transaction
// @route   GET /api/v1/transactions/:id
// @access  Private
exports.getTransaction = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Get transaction ${req.params.id}` });
};

// @desc    Create new transaction
// @route   POST /api/v1/transactions
// @access  Private
exports.createTransaction = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Create new transaction' });
};

// @desc    Update transaction
// @route   PUT /api/v1/transactions/:id
// @access  Private
exports.updateTransaction = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Update transaction ${req.params.id}` });
};

// @desc    Delete transaction
// @route   DELETE /api/v1/transactions/:id
// @access  Private
exports.deleteTransaction = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete transaction ${req.params.id}` });
};
