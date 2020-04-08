const mongoose = require('mongoose');
const Currency = require('../../src/models/currency');

const currencyOneId = new mongoose.Types.ObjectId();
const currencyOne = {
  _id: currencyOneId,
  name: 'Dollar',
  acronym: 'USD',
  value: 1,
};

const currencyTwoId = new mongoose.Types.ObjectId();
const currencyTwo = {
  _id: currencyTwoId,
  name: 'Argentine peso',
  acronym: 'ARS',
  value: 1,
};

const setupCurrencies = async () => {
  await Currency.deleteMany();
  await new Currency(currencyOne).save();
  await new Currency(currencyTwo).save();
};

module.exports = {
  currencyOneId,
  currencyOne,
  currencyTwoId,
  currencyTwo,
  setupCurrencies,
};
