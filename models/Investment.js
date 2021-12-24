const mongoose = require('mongoose');

const InvestmentSchema = new mongoose.Schema({
  investmentTitle: {
    type: String
  },
  fullName: {
    type: String,
    required: [true, 'Input your Full Name']
  },
  userEmail: {
    type: String,
    required: [true, 'Input your Email Address']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Investment', InvestmentSchema);
