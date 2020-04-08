const express = require('express');
require('./db/mongoose');
const apiRouter = require('./routes');

const app = express();

app.use(express.json());
app.use(apiRouter);

module.exports = app;
