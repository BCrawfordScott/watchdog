const Validator = require('validator');
const validText = require('../util/validText');

module.exports = function validateLoginInput(data) {
  const errors = {};
  const dataClone = Object.assign({}, data);

  dataClone.email = validText(dataClone.email) ? dataClone.email : '';
  dataClone.password = validText(dataClone.password) ? dataClone.password : '';
  dataClone.password2 = validText(dataClone.password2) ? dataClone.password2 : '';
  dataClone.username = validText(dataClone.username) ? dataClone.username : null;

  const { email, password, password2 } = dataClone;

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
  if (!Validator.isLength(password, { min: 6, max: undefined })) {
    errors.password = errors.password || [];
    errors.password.push('Password must be at least 6 characters')
  }
  if (Validator.isEmpty(password2)) {
    errors.password2 = errors.password2 || [];
    errors.password2.push('Confirm password field is required.')
  }
  if (!Validator.equals(password, password2)) {
    errors.password2 = errors.password2 || [];
    errors.password2.push('Password fields must match.')
  }

  const isValid = Object.keys(errors).length === 0;

  return {
    errors,
    isValid,
  }
}