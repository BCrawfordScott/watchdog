const User = require('../models/User');
const {
  registerUser,
  loginUser
} = require('../services/authenticity');

module.exports = {
  register: function(req, res) {
    User.findOne({ email: req.body.email }).then(user => registerUser(user, req, res));
  },
  login: function(req, res) {
    const { email, password } = req.body;
    User.findOne({email}).then(user => loginUser(user, password, res));
  },
}