const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Coin = require('../models/Coin');

// @desc    Get all coins
// @route   GET /api/v1/coins
// @access  Private
exports.getCoins = asyncHandler(async (req, res, next) => {
  const coins = await Coin.find();
  res.status(200).json({
    success: true,
    msg: 'Fetched all coins',
    count: coins.length,
    data: coins
  });
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
  const coin = await Coin.create(req.body);
  console.log(coin);
  res.status(201).json({
    success: true,
    msg: 'Createed new coin',
    data: coin
  });
});

// @desc    Update coin
// @route   PUT /api/v1/coins/:id
// @access  Private
exports.updateCoin = asyncHandler(async (req, res, next) => {
  const coin = await Coin.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!coin) {
    return next(
      new ErrorResponse(`Coin not found with id of ${req.params.id}`, 404)
    );
  }

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
  const coin = await Coin.findByIdAndRemove(req.params.id);

  if (!coin) {
    return next(
      new ErrorResponse(`Coin not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    msg: `Deleted coin ${req.params.id}`,
    data: {}
  });
});
