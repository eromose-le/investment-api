const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: [true, 'Please add wallet address name'],
    maxlength: [80, 'Name cannot be more then 50 characters']
  },
  amountBtc: {
    type: String,
    required: [true, 'Please add BTC equavilent Amount']
  },
  valueUsd: {
    type: String,
    required: [true, 'Please add USD amount equavilent']
  },
  transactionNature: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
