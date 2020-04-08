const express = require('express');
const router = express.Router();
const incomeController = require('../controllers/income.controller');

router.post('/incomes', incomeController.add);
router.get('/incomes', incomeController.getMany);
router.get('/incomes/:id', incomeController.getOne);
router.patch('/incomes/:id', incomeController.update);
router.delete('/incomes/:id', incomeController.remove);

module.exports = router;
