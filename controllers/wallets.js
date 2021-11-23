const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Wallet = require('../models/Wallet');

// @desc    Get all wallets
// @route   GET /api/v1/wallets
// @access  Private
exports.getWallets = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single wallet
// @route   GET /api/v1/wallet/:id
// @access  Private
exports.getWallet = asyncHandler(async (req, res, next) => {
  const wallet = await Wallet.findById(req.params.id);

  if (!wallet) {
    return next(
      new ErrorResponse(`Wallet not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: wallet
  });
});

// @desc    Create new wallet
// @route   POST /api/v1/wallets
// @access  Private
exports.createWallet = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  // If the user is not an admin, they can not add Wallet
  if (req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `The user with ID ${req.user.id} is not autorized to create Wallet!.`,
        400
      )
    );
  }

  const wallet = await Wallet.create(req.body);

  res.status(201).json({
    success: true,
    msg: 'Created new Wallet',
    data: wallet
  });
});

// @desc    Update wallet
// @route   PUT /api/v1/wallets/:id
// @access  Private
exports.updateWallet = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  let wallet = await Wallet.findById(req.params.id);

  if (!wallet) {
    return next(
      new ErrorResponse(`Wallet not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is admin
  if (req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this wallet`,
        401
      )
    );
  }

  wallet = await Wallet.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    msg: `Updated wallet ${req.params.id}`,
    data: wallet
  });
});

// @desc    Delete wallet
// @route   DELETE /api/v1/wallets/:id
// @access  Private
exports.deleteWallet = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  const wallet = await Wallet.findById(req.params.id);

  if (!wallet) {
    return next(
      new ErrorResponse(`Wallet not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is wallet owner or admin
  if (req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to delete this wallet`,
        401
      )
    );
  }

  wallet.remove();

  res.status(200).json({
    success: true,
    msg: `Deleted wallet ${req.params.id}`,
    data: {}
  });
});
