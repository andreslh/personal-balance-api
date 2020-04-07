const request = require('supertest');
const app = require('../src/app');
const Currency = require('../src/models/currency');

test('should create currency', async () => {
  const response = await request(app)
    .post('/currencies')
    .send({
      name: 'Dollar',
      acronym: 'USD',
      value: 1,
    })
    .expect(201);
  const currency = await Currency.findById(response.body._id);
  expect(currency).not.toBeNull();
});
