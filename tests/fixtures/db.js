const { setupCurrencies } = require('./currency');
const { setupIncomes } = require('./income');
const { setupExpenses } = require('./expense');

const setupDatabase = async () => {
  await setupCurrencies();
  await setupIncomes();
  await setupExpenses();
};

module.exports = setupDatabase;
