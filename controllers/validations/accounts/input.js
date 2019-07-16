const Validator = require('validator');
const validText = require('../util/validText');

module.exports = function validateAccountInput(data) {
  const errors = {};
  const dataClone = Object.assign({}, data);
  
  dataClone.name = validText(dataClone.name) ? dataClone.name : ''

  const { name } = dataClone;

  if(Validator.isEmpty(name)) {
    errors.name = errors.name || [];
    errors.name.push('Name field is required')
  }

  if(!Validator.isLength(name, { min: 1, max: 140 })) {
    errors.name = errors.name || [];
    errors.name.push('Account name must be between 1 and 140 characters.')
  }

  const isValid = Object.keys(errors).length === 0;

  return {
    errors,
    isValid,
  }
}