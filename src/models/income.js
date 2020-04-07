const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    currency: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Currency',
    },
  },
  {
    timestamps: true,
  },
);

const Income = mongoose.model('Income', incomeSchema);

module.exports = Income;
