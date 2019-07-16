const User = require('../models/User');
const {
  registerUser,
  loginUser,
} = require('../services/authenticity');
const {
  validateLogin,
  validateRegistration,
} = require('./validations/validations');

module.exports = {
  register: function(req, res) {
    const { body } = req;
    const { errors, isValid } = validateRegistration(body);
    
    if (!isValid) return res.status(422).json(errors);

    const { email } = body;

    User.findOne({ email: email }).then(user => registerUser(user, req, res));
  },
  login: function(req, res) {
    const { body } = req;
    const { errors, isValid } = validateLogin(body);

    if (!isValid) return res.status(422).json(errors);

    const { email, password } = body;

    User.findOne({email}).then(user => loginUser(user, password, res));
  },
  current: function (req, res) {
    // const { id, username, email } = req.user;
    res.json(req.user);
  },
}