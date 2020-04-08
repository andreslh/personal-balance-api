const express = require('express');
const Income = require('../models/income');

const add = async (req, res) => {
  const income = new Income({
    ...req.body,
  });

  try {
    await income.save();
    res.status(201).send(income);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getMany = async (req, res) => {
  try {
    const incomes = await Income.find();
    res.send(incomes);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const income = await Income.findOne({ _id: id });

    if (!income) {
      return res.status(404).send();
    }

    res.send(income);
  } catch (error) {
    res.status(400).send(error);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const allowedFields = ['name', 'amount', 'description', 'currency'];
    const fieldsToUpdate = Object.keys(body);
    const isValidUpdate = fieldsToUpdate.every((key) =>
      allowedFields.includes(key),
    );

    if (!isValidUpdate) {
      return res.status(400).send('Invalid fields');
    }

    const income = await Income.findOne({ _id: id });

    if (!income) {
      return res.status(404).send();
    }

    fieldsToUpdate.forEach((field) => (income[field] = body[field]));
    await income.save();

    res.send(income);
  } catch (error) {
    res.status(400).send(error);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const income = await Income.findOneAndDelete({ _id: id });

    if (!income) {
      return res.status(404).send();
    }

    res.send(income);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  add,
  getMany,
  getOne,
  update,
  remove,
};
