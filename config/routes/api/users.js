const express = require('express');
const router = express.Router();
const { 
  register,
  login,
  current,
} = require('../../../controllers/usersController');
const { authenticate } = require('../../../services/authenticity');

const tester = function(req, res) {
  res.json({msg: "This is the user test route"});
}

router.get("/test", tester);
router.post("/register", register);
router.post("/login", login);
router.get('/current', authenticate, current);


module.exports = router;