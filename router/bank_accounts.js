const express = require('express');
const router = express.Router();
// const { get, getById, create, update, destroy } = require('../app/controller/users')

const controller = require('../app/controller')

// router.get('/users', get);
// router.get('/users/:id', getById);
// router.post('/users', create);
// router.put('/users/:id',update);
// router.delete('/users/:id',destroy);

// router.get('/bank_accounts', controller.bank_accounts.get);
// router.get('/bank_accounts/:id', controller.bank_accounts.getById);
// router.post('/bank_accounts', controller.bank_accounts.create);
// router.put('/bank_accounts/:id',controller.bank_accounts.update);
// router.delete('/bank_accounts/:id',controller.bank_accounts.destroy);

router.get('/v1/bank_accounts', controller.bank_accountsV2.get);
router.get('/v1/bank_accounts/:id', controller.bank_accountsV2.getById);
router.post('/v1/bank_accounts', controller.bank_accountsV2.create);
router.put('/v1/bank_accounts/:id',controller.bank_accountsV2.update);
router.delete('/v1/bank_accounts/:id',controller.bank_accountsV2.destroy);

module.exports = router;