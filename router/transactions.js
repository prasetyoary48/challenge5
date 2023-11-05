const express = require('express');
const router = express.Router();
// const { get, getById, create, update, destroy } = require('../app/controller/users')

const controller = require('../app/controller')

// router.get('/users', get);
// router.get('/users/:id', getById);
// router.post('/users', create);
// router.put('/users/:id',update);
// router.delete('/users/:id',destroy);

// router.get('/transactions', controller.transactions.get);
// router.get('/transactions/:id', controller.transactions.getById);
// router.post('/transactions', controller.transactions.create);
// router.put('/transactions/:id',controller.transactions.update);
// router.delete('/transactions/:id',controller.transactions.destroy);

router.get('/v1/transactions', controller.transactionsV2.get);
router.get('/v1/transactions/:id', controller.transactionsV2.getById);
router.post('/v1/transactions', controller.transactionsV2.create);
router.put('/v1/transactions/:id',controller.transactionsV2.update);
router.delete('/v1/transactions/:id',controller.transactionsV2.destroy);

module.exports = router;