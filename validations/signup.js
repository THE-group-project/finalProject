const validator = require('validator');
const isEmpty = require('./isEmpty');

const validateSignUp = data => {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!validator.isLength(data.name, { min: 2, max: 40 })) {
    errors.name = 'name must be between 2 and 40 characters';
  }
  if (validator.isEmpty(data.name)) {
    errors.name = "don't be coy. tell us your name.";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = 'email is invalid';
  }
  if (validator.isEmpty(data.email)) {
    errors.email = 'please enter an email';
  }
  if (!validator.isLength(data.password, { min: 8, max: 20 })) {
    errors.password = 'password is invalid.';
  }

  if (validator.isEmpty(data.password)) {
    errors.password = 'please enter a password.';
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = 'please confirm your password';
  }
  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "passwords don't seem to match";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateSignUp;
