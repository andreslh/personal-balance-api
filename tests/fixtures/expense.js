const mongoose = require('mongoose');
const Expense = require('../../src/models/expense');
const { currencyOneId } = require('./currency');

const expenseOneId = new mongoose.Types.ObjectId();
const expenseOne = {
  _id: expenseOneId,
  name: 'Rent',
  currency: currencyOneId,
  amount: 1000,
};

const expenseTwoId = new mongoose.Types.ObjectId();
const expenseTwo = {
  _id: expenseTwoId,
  name: 'English classes',
  currency: currencyOneId,
  amount: 150,
};

const setupExpenses = async () => {
  await Expense.deleteMany();
  await new Expense(expenseOne).save();
  await new Expense(expenseTwo).save();
};

module.exports = {
  expenseOneId,
  expenseOne,
  expenseTwoId,
  expenseTwo,
  setupExpenses,
};
