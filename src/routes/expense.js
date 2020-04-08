const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense.controller');

router.post('/expenses', expenseController.add);
router.get('/expenses', expenseController.getMany);
router.get('/expenses/:id', expenseController.getOne);
router.patch('/expenses/:id', expenseController.update);
router.delete('/expenses/:id', expenseController.remove);

module.exports = router;
