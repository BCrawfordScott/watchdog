const express = require('express');
const router = express.Router();
const passport = require('passport');
const { 
  register,
  login,
} = require('../../../controllers/usersController');

const tester = function(req, res) {
  res.json({msg: "This is the user test route"});
}

router.get("/test", tester);
router.post("/register", register);
router.post("/login", login);

// Testing //
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { id, username, email } = req.user;
  res.json({ id, username, email });
});
// Testing //

module.exports = router;