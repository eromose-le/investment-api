const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema(
  {
    invoiceId: {
      type: String,
      required: [true, 'Please add an Invoice ID']
    },
    investorClass: {
      type: String,
      required: [true, 'Please add Investor Class field']
    },
    tradeNature: {
      type: String,
      required: [true, 'Please add Trade Nature field']
    },
    tradeDuration: {
      type: String,
      required: [true, 'Please add Trade Duration field']
    },
    accumulatedCost: {
      type: String,
      required: [true, 'Please add Accumulated Cost field']
    },
    estimatedAmount: {
      type: String,
      required: [true, 'Please add Estimated Amount field']
    },
    estimatedDate: {
      type: String,
      required: [true, 'Please add Estimated Date field']
    },
    invoiceDueDate: {
      type: String,
      required: [true, 'Please add Invoice Due Date field']
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

module.exports = mongoose.model('Invoice', InvoiceSchema);
