const request = require('supertest');
const app = require('../src/app');
const Income = require('../src/models/income');
const setupDatabase = require('./fixtures/db');
const { incomeTwoId, incomeTwo } = require('./fixtures/income');
const { currencyOneId } = require('./fixtures/currency');

beforeEach(setupDatabase);

describe('create income', () => {
  test('should create income if fields are valid', async () => {
    const response = await request(app)
      .post('/incomes')
      .send({
        name: 'Extra work',
        currency: currencyOneId,
        amount: 500,
      })
      .expect(201);
    const income = await Income.findById(response.body._id);
    expect(income).not.toBeNull();
  });

  test('should not create income if fields are missing', async () => {
    await request(app)
      .post('/incomes')
      .send({
        currency: currencyOneId,
        amount: 500,
      })
      .expect(400);
  });
});

describe('get incomes', () => {
  test('should list all incomes if no ID is passed', async () => {
    const response = await request(app).get('/incomes').send().expect(200);
    expect(response.body.length).toBe(2);
  });

  test('should retrieve the right income if ID is passed', async () => {
    const response = await request(app)
      .get(`/incomes/${incomeTwoId}`)
      .send()
      .expect(200);

    const income = response.body;
    expect(income.name).toEqual(incomeTwo.name);
    expect(income.currency).toEqual(incomeTwo.currency.toHexString());
    expect(income.amount).toEqual(incomeTwo.amount);
  });
});

describe('update income', () => {
  test('should update the right income if fields are valid', async () => {
    const newName = 'Other income';
    const response = await request(app)
      .patch(`/incomes/${incomeTwoId}`)
      .send({
        name: newName,
      })
      .expect(200);

    const updatedIncome = response.body;
    expect(updatedIncome.name).toEqual(newName);
    expect(updatedIncome.currency).toBe(incomeTwo.currency.toHexString());
    expect(updatedIncome.amount).toEqual(incomeTwo.amount);
  });

  test('should prevent update if fields are invalid', async () => {
    await request(app)
      .patch(`/incomes/${incomeTwoId}`)
      .send({
        invalidField: 'invalidValue',
      })
      .expect(400);
  });

  test('should prevent update if no ID is passed', async () => {
    await request(app).patch('/incomes').send().expect(404);
  });
});

describe('delete income', () => {
  test('should delete income if ID is correct', async () => {
    await request(app).delete(`/incomes/${incomeTwoId}`).expect(200);
    await request(app).get(`/incomes/${incomeTwoId}`).expect(404);
  });

  test('should prevent delete if no ID is passed', async () => {
    await request(app).delete('/incomes').expect(404);
  });
});
