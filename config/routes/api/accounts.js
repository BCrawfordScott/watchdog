const express = require('express');
const router = express.Router();
const {
  currentUserAccounts,
  singleAccount,
  createAccount,
} = require('../../../controllers/accountsController');
const { authenticate } = require('../../../services/authenticity');


router.get('/test', (req, res) => res.json({ msg: "This is the account test route" }));
router.get('/', authenticate, currentUserAccounts);
router.get('/:accountId', singleAccount)
router.post('/', authenticate, createAccount)

module.exports = router;