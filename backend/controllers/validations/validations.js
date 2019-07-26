const validateLogin = require('./users/login');
const validateRegistration = require('./users/register');
const validateAccountInput = require('./accounts/input');

module.exports = {
  validateLogin,
  validateRegistration,
  validateAccountInput,
};