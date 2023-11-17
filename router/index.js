const express = require('express');
const router = express.Router();

const users = require('./users');
const bank_accounts = require('./bank_accounts');
const transactions = require('./transactions');
const auth = require('./auth')
const media = require('./media')

router.get("/", (req, res)=> {
    res.send("Selamat Datang")
});

router.use(users);
router.use(auth);
router.use(bank_accounts);
router.use(transactions);
router.use(media);

// router.use()
module.exports = router;