const express = require('express');
const router = express.Router();
const { 
  register,
} = require('../../../controllers/usersController');

const tester = function(req, res) {
  res.json({msg: "This is the user test route"});
}

router.get("/test", tester);
router.post("/register", register);

module.exports = router;