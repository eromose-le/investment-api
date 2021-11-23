const mongoose = require('mongoose');

const CoinSchema = new mongoose.Schema(
  {
    coin: {
      type: String
    },
    abbr: {
      type: String
    },
    address: {
      type: String
    },
    img: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
    transaction: {
      type: mongoose.Schema.ObjectId,
      ref: 'Transaction',
      required: true
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Cascade delete transactions when a Coin is deleted
CoinSchema.pre('remove', async function (next) {
  console.log(`Transactions being removed from coin ${this._id}`);
  await this.model('Transaction').deleteMany({ coin: this._id });
  next();
});

// Reverse populate with virtuals
CoinSchema.virtual('transactions', {
  ref: 'Transaction',
  localField: '_id',
  foreignField: 'coin',
  justOne: false
});

module.exports = mongoose.model('Coin', CoinSchema);
