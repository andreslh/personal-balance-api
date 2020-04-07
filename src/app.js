const express = require('express');
require('./db/mongoose');
const currencyRouter = require('./routers/currency');

const app = express();

app.use(express.json());
app.use(currencyRouter);

module.exports = app;
