const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Investment = require('../models/Investment');

// @desc    Get all investments
// @route   GET /api/v1/investments
// @access  Public
exports.getInvestments = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single investment
// @route   GET /api/v1/investment/:id
// @access  Public
exports.getInvestment = asyncHandler(async (req, res, next) => {
  const investment = await Investment.findById(req.params.id);

  if (!investment) {
    return next(
      new ErrorResponse(`Investment not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: investment
  });
});

// @desc    Create new investment
// @route   POST /api/v1/investments
// @access  Private
exports.createInvestment = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  const investment = await Investment.create(req.body);

  res.status(201).json({
    success: true,
    msg: 'Created new Investment',
    data: investment
  });
});

// @desc    Update investment
// @route   PUT /api/v1/investments/:id
// @access  Private
exports.updateInvestment = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  let investment = await Investment.findById(req.params.id);

  if (!investment) {
    return next(
      new ErrorResponse(`Investment not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is investment owner or admin
  if (req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this investment`,
        401
      )
    );
  }

  investment = await Investment.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    msg: `Updated investment ${req.params.id}`,
    data: investment
  });
});

// @desc    Delete investment
// @route   DELETE /api/v1/investments/:id
// @access  Private
exports.deleteInvestment = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  const investment = await Investment.findById(req.params.id);

  if (!investment) {
    return next(
      new ErrorResponse(`Investment not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is investment owner
  if (req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to delete this investment`,
        401
      )
    );
  }

  investment.remove();

  res.status(200).json({
    success: true,
    msg: `Deleted investment ${req.params.id}`,
    data: {}
  });
});
