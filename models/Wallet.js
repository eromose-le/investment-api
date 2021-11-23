const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema(
  {
    totalBalance: {
      type: String,
      required: [true, 'Please add Total Balance']
    },
    profit: {
      type: String,
      required: [true, 'Please add Profit']
    },
    activeInvestment: {
      type: String,
      required: [true, 'Please add Active Investment']
    },
    totalDeposit: {
      type: String,
      required: [true, 'Please add Total Deposit']
    },
    totalWithdrawal: {
      type: String,
      required: [true, 'Please add Total Withdrawal']
    },
    owner: {
      type: String,
      required: [true, "Please add Owner's ID"]
    },
    referral: {
      type: String,
      required: [true, 'Please add Referral']
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

module.exports = mongoose.model('Wallet', WalletSchema);
