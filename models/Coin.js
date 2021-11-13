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
  }
});

module.exports = mongoose.model('Coin', CoinSchema);
