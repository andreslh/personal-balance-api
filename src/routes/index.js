const express = require('express');
const currencyRouter = require('./currency');
const incomeRouter = require('./income');
const expenseRouter = require('./expense');

const apiRouter = express.Router();

apiRouter.use(currencyRouter);
apiRouter.use(incomeRouter);
apiRouter.use(expenseRouter);

module.exports = apiRouter;
