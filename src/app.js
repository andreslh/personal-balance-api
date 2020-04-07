const express = require('express');
require('./db/mongoose');
const currencyRouter = require('./routers/currency');
const incomeRouter = require('./routers/income');
const expenseRouter = require('./routers/expense');

const app = express();

app.use(express.json());
app.use(currencyRouter);
app.use(incomeRouter);
app.use(expenseRouter);

module.exports = app;
