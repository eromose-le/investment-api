const mongoose = require('mongoose');

const InvestmentSchema = new mongoose.Schema({
  investmentTitle: {
    type: String
  },
  investmentPlan: {
    type: String
  },
  investorUsername: {
    type: String
  },
  minBuy: {
    type: String
  },
  withdrawable: {
    type: String
  },
  investAmount: {
    type: String,
    required: [true, 'Input amount you want to invest'],
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Investment', InvestmentSchema);
