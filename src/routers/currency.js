const express = require('express');
const Currency = require('../models/currency');
const router = express.Router();

router.post('/currencies', async (req, res) => {
  const currency = new Currency({
    ...req.body,
  });

  try {
    await currency.save();
    res.status(201).send(currency);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/currencies', async (req, res) => {
  try {
    const currencies = await Currency.find();
    res.send(currencies);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/currencies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const currency = await Currency.findOne({ _id: id });
    if (!currency) {
      return res.status(404).send();
    }

    res.send(currency);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch('/currencies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const allowedFields = ['name', 'acronym', 'value'];
    const fieldsToUpdate = Object.keys(body);
    const isValudUpdate = fieldsToUpdate.every((key) =>
      allowedFields.includes(key),
    );
    if (!isValudUpdate) {
      return res.status(400).send('Invalid fields');
    }

    const currency = await Currency.findOne({ _id: id });

    if (!currency) {
      res.send(404);
    }

    fieldsToUpdate.forEach((field) => (currency[field] = body[field]));
    await currency.save();

    res.send(currency);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/currencies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const currency = await Currency.findOneAndDelete({ _id: id });

    if (!currency) {
      return res.status(404).send();
    }

    res.send(currency);
  } catch (error) {
    res.status(400).send();
  }
});

module.exports = router;
