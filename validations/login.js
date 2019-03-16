const validator = require('validator');
const isEmpty = require('./isEmpty');

const validateLogin = data => {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!validator.isEmail(data.email)) {
    errors.email = 'email is invalid';
  }
  if (!validator.isLength(data.password, { min: 8, max: 20 })) {
    errors.password = 'password is invalid.';
  }
  if (validator.isEmpty(data.password)) {
    errors.password = 'please enter a password.';
  }
  if (validator.isEmpty(data.email)) {
    errors.email = 'please enter an email';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateLogin;
