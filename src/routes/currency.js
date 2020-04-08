const express = require('express');
const router = express.Router();
const currencyController = require('../controllers/currency.controller');

router.post('/currencies', currencyController.add);
router.get('/currencies', currencyController.getMany);
router.get('/currencies/:id', currencyController.getOne);
router.patch('/currencies/:id', currencyController.update);
router.delete('/currencies/:id', currencyController.remove);

module.exports = router;
