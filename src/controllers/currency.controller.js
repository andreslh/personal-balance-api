const express = require('express');
const Currency = require('../models/currency');

const add = async (req, res) => {
  const currency = new Currency({
    ...req.body,
  });

  try {
    await currency.save();
    res.status(201).send(currency);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getMany = async (req, res) => {
  try {
    const currencies = await Currency.find();
    res.send(currencies);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getOne = async (req, res) => {
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
};

const update = async (req, res) => {
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
      return res.send(404);
    }

    fieldsToUpdate.forEach((field) => (currency[field] = body[field]));
    await currency.save();

    res.send(currency);
  } catch (error) {
    res.status(400).send(error);
  }
};

const remove = async (req, res) => {
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
};

module.exports = {
  add,
  getMany,
  getOne,
  update,
  remove,
};
