const mongoose = require('mongoose');
const Income = require('../../src/models/income');
const { currencyOneId } = require('./currency');

const incomeOneId = new mongoose.Types.ObjectId();
const incomeOne = {
  _id: incomeOneId,
  name: 'Salary',
  currency: currencyOneId,
  amount: 1000,
};

const incomeTwoId = new mongoose.Types.ObjectId();
const incomeTwo = {
  _id: incomeTwoId,
  name: 'Bonus',
  currency: currencyOneId,
  amount: 150,
};

const setupIncomes = async () => {
  await Income.deleteMany();
  await new Income(incomeOne).save();
  await new Income(incomeTwo).save();
};

module.exports = {
  incomeOneId,
  incomeOne,
  incomeTwoId,
  incomeTwo,
  setupIncomes,
};
