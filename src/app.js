const express = require('express');
const cors = require('cors');
require('./db/mongoose');
const apiRouter = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(apiRouter);

module.exports = app;
