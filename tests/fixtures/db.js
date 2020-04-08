const { setupCurrencies } = require('./currency');

const setupDatabase = async () => {
  await setupCurrencies();
};

module.exports = setupDatabase;
