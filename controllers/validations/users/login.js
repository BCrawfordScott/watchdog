const Validator = require('validator');
const validText = require('../util/validText');

module.exports = function validateLoginInput(data) {
  const errors = {};
  const dataClone = Object.assign({}, data);
  
  dataClone.email = validText(dataClone.email) ? dataClone.email : ''
  dataClone.password = validText(dataClone.password) ? dataClone.password : ''
  
  const { email, password } = dataClone;

  if (Validator.isEmpty(email)) {
    errors.email = errors.email || [];
    errors.email.push('Email field is required.')
  }
  if (!Validator.isEmail(email)) {
    errors.email = errors.email || [];
    errors.email.push('Email is invalid.')
  }
  if (Validator.isEmpty(password)) {
    errors.password = errors.password || [];
    errors.password.push('Password field is required.')
  }

  const isValid = Object.keys(errors).length === 0;
  
  return {
    errors,
    isValid,
  }
}