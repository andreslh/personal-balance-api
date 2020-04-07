const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
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
    due_date: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
