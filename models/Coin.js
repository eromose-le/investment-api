const mongoose = require('mongoose');

const CoinSchema = new mongoose.Schema({
  coin: {
    type: String
  },
  abbr: {
    type: String
  },
  address: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  transaction: {
    type: mongoose.Schema.ObjectId,
    ref: 'Transaction',
    required: true
  }
});

module.exports = mongoose.model('Coin', CoinSchema);
