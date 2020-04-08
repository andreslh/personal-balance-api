const express = require('express');
const Expense = require('../models/expense');
const router = express.Router();

const add = async (req, res) => {
  const expenseBody = { ...req.body };
  if (expenseBody.due_date) {
    expenseBody.due_date = new Date(expenseBody.due_date).toISOString();
  }

  const expense = new Expense(expenseBody);

  try {
    await expense.save();
    res.status(201).send(expense);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getMany = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.send(expenses);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findOne({ _id: id });

    if (!expense) {
      return res.status(404).send();
    }

    res.send(expense);
  } catch (error) {
    res.status(400).send(error);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const allowedFields = [
      'name',
      'amount',
      'description',
      'currency',
      'due_date',
    ];
    const fieldsToUpdate = Object.keys(body);
    const isValidUpdate = fieldsToUpdate.every((key) =>
      allowedFields.includes(key),
    );

    if (!isValidUpdate) {
      return res.status(400).send('Invalid fields');
    }

    const expense = await Expense.findOne({ _id: id });

    if (!expense) {
      return res.status(404).send();
    }

    fieldsToUpdate.forEach((field) => (expense[field] = body[field]));
    await expense.save();

    res.send(expense);
  } catch (error) {
    res.status(400).send(error);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findOneAndDelete({ _id: id });

    if (!expense) {
      return res.status(404).send();
    }

    res.send(expense);
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
