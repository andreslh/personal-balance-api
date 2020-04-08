const request = require('supertest');
const app = require('../src/app');
const Currency = require('../src/models/currency');
const setupDatabase = require('./fixtures/db');
const {
  currencyOne,
  currencyTwoId,
  currencyTwo,
} = require('./fixtures/currency');

beforeEach(setupDatabase);

describe('create currency', () => {
  test('should create currency if fields are valid', async () => {
    const response = await request(app)
      .post('/currencies')
      .send({
        name: 'Zloty',
        acronym: 'PLN',
        value: 0.24,
      })
      .expect(201);
    const currency = await Currency.findById(response.body._id);
    expect(currency).not.toBeNull();
  });

  test('should not create currency if fields are missing', async () => {
    await request(app)
      .post('/currencies')
      .send({
        acronym: 'USD',
        value: 1,
      })
      .expect(400);
  });

  test('should prevent insert repeated currency', async () => {
    await request(app)
      .post('/currencies')
      .send({ ...currencyOne })
      .expect(400);
  });
});

describe('get currencies', () => {
  test('should list all currencies if no ID is passed', async () => {
    const response = await request(app).get('/currencies').send().expect(200);
    expect(response.body.length).toBe(2);
  });

  test('should retrieve the right currency if ID is passed', async () => {
    const response = await request(app)
      .get(`/currencies/${currencyTwoId}`)
      .send()
      .expect(200);

    const currency = response.body;
    expect(currency.name).toEqual(currencyTwo.name);
    expect(currency.acronym).toEqual(currencyTwo.acronym);
    expect(currency.value).toEqual(currencyTwo.value);
  });
});

describe('update currency', () => {
  test('should update the right currency if fields are valid', async () => {
    const newName = 'Other currency';
    const response = await request(app)
      .patch(`/currencies/${currencyTwoId}`)
      .send({
        name: newName,
      })
      .expect(200);

    const updatedCurrency = response.body;
    expect(updatedCurrency.name).toEqual(newName);
    expect(updatedCurrency.acronym).toEqual(currencyTwo.acronym);
    expect(updatedCurrency.value).toEqual(currencyTwo.value);
  });

  test('should prevent update if fields are invalid', async () => {
    await request(app)
      .patch(`/currencies/${currencyTwoId}`)
      .send({
        invalidField: 'invalidValue',
      })
      .expect(400);
  });

  test('should prevent update if no ID is passed', async () => {
    await request(app).patch('/currencies').send().expect(404);
  });
});

describe('delete currency', () => {
  test('should delete currency if ID is correct', async () => {
    await request(app).delete(`/currencies/${currencyTwoId}`).expect(200);
    await request(app).get(`/currencies/${currencyTwoId}`).expect(404);
  });

  test('should prevent delete if no ID is passed', async () => {
    await request(app).delete('/currencies').expect(404);
  });
});
