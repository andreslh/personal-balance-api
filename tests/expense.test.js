const request = require('supertest');
const app = require('../src/app');
const Expense = require('../src/models/expense');
const setupDatabase = require('./fixtures/db');
const { expenseTwoId, expenseTwo } = require('./fixtures/expense');
const { currencyOneId } = require('./fixtures/currency');

beforeEach(setupDatabase);

describe('create expense', () => {
  test('should create expense if fields are valid', async () => {
    const response = await request(app)
      .post('/expenses')
      .send({
        name: 'Gym',
        currency: currencyOneId,
        amount: 200,
      })
      .expect(201);
    const expense = await Expense.findById(response.body._id);
    expect(expense).not.toBeNull();
  });

  test('should not create expense if fields are missing', async () => {
    await request(app)
      .post('/expenses')
      .send({
        currency: currencyOneId,
        amount: 500,
      })
      .expect(400);
  });
});

describe('get expenses', () => {
  test('should list all expenses if no ID is passed', async () => {
    const response = await request(app).get('/expenses').send().expect(200);
    expect(response.body.length).toBe(2);
  });

  test('should retrieve the right expense if ID is passed', async () => {
    const response = await request(app)
      .get(`/expenses/${expenseTwoId}`)
      .send()
      .expect(200);

    const expense = response.body;
    expect(expense.name).toEqual(expenseTwo.name);
    expect(expense.currency).toEqual(expenseTwo.currency.toHexString());
    expect(expense.amount).toEqual(expenseTwo.amount);
  });
});

describe('update expense', () => {
  test('should update the right expense if fields are valid', async () => {
    const newName = 'Other expense';
    const response = await request(app)
      .patch(`/expenses/${expenseTwoId}`)
      .send({
        name: newName,
      })
      .expect(200);

    const updatedExpense = response.body;
    expect(updatedExpense.name).toEqual(newName);
    expect(updatedExpense.currency).toBe(expenseTwo.currency.toHexString());
    expect(updatedExpense.amount).toEqual(expenseTwo.amount);
  });

  test('should prevent update if fields are invalid', async () => {
    await request(app)
      .patch(`/expenses/${expenseTwoId}`)
      .send({
        invalidField: 'invalidValue',
      })
      .expect(400);
  });

  test('should prevent update if no ID is passed', async () => {
    await request(app).patch('/expenses').send().expect(404);
  });
});

describe('delete expense', () => {
  test('should delete income if ID is correct', async () => {
    await request(app).delete(`/expenses/${expenseTwoId}`).expect(200);
    await request(app).get(`/expenses/${expenseTwoId}`).expect(404);
  });

  test('should prevent delete if no ID is passed', async () => {
    await request(app).delete('/expenses').expect(404);
  });
});
