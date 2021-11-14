const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Coin = require('../models/Coin');

// @desc    Get all coins
// @route   GET /api/v1/coins
// @access  Private
exports.getCoins = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single coin
// @route   GET /api/v1/coins/:id
// @access  Private
exports.getCoin = asyncHandler(async (req, res, next) => {
  const coin = await Coin.findById(req.params.id);

  if (!coin) {
    return next(
      new ErrorResponse(`Coin not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: coin
  });
});

// @desc    Create new coin
// @route   POST /api/v1/coins
// @access  Private
exports.createCoin = asyncHandler(async (req, res, next) => {
  console.log(req.user.id);
  // Add user to req.body
  req.body.user = req.user.id;

  const coin = await Coin.create(req.body);

  res.status(201).json({
    success: true,
    msg: 'Created new coin',
    data: coin
  });
});

// @desc    Update coin
// @route   PUT /api/v1/coins/:id
// @access  Private
exports.updateCoin = asyncHandler(async (req, res, next) => {
  let coin = await Coin.findById(req.params.id);

  if (!coin) {
    return next(
      new ErrorResponse(`Coin not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is coin owner
  if (coin.user.toString() !== req.user.id && req.user.role !== 'developer') {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this coin`,
        401
      )
    );
  }

  coin = await Coin.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    msg: `Updated coin ${req.params.id}`,
    data: coin
  });
});

// @desc    Delete coin
// @route   DELETE /api/v1/coins/:id
// @access  Private
exports.deleteCoin = asyncHandler(async (req, res, next) => {
  const coin = await Coin.findById(req.params.id);

  if (!coin) {
    return next(
      new ErrorResponse(`Coin not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is coin owner
  if (coin.user.toString() !== req.user.id && req.user.role !== 'developer') {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to delete this coin`,
        401
      )
    );
  }

  coin.remove();

  res.status(200).json({
    success: true,
    msg: `Deleted coin ${req.params.id}`,
    data: {}
  });
});
