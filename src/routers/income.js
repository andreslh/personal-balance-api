const express = require('express');
const Income = require('../models/income');
const router = express.Router();

router.post('/incomes', async (req, res) => {
  const income = new Income({
    ...req.body,
  });

  try {
    await income.save();
    res.status(201).send(income);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/incomes', async (req, res) => {
  try {
    const incomes = await Income.find();
    res.send(incomes);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/incomes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const income = await Income.findOne({ _id: id });

    if (!income) {
      res.status(404).send();
    }

    res.send(income);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch('/incomes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const allowedFields = ['name', 'amount', 'description', 'currency'];
    const fieldsToUpdate = Object.keys(body);
    const isValidUpdate = fieldsToUpdate.every((key) =>
      allowedFields.includes(key),
    );

    if (!isValidUpdate) {
      res.status(400).send('Invalid fields');
    }

    const income = await Income.findOne({ _id: id });

    if (!income) {
      res.status(404).send();
    }

    fieldsToUpdate.forEach((field) => (income[field] = body[field]));
    await income.save();

    res.send(income);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/incomes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const income = await Income.findOneAndDelete({ _id: id });

    if (!income) {
      res.status(404).send();
    }

    res.send(income);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
