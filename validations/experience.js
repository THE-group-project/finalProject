const validator = require('validator');
const isEmpty = require('./isEmpty');

const validateExperience = data => {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  if (validator.isEmpty(data.title)) {
    errors.title = 'please entire a job title';
  }

  if (validator.isEmpty(data.company)) {
    errors.company = 'please enter a company';
  }

  if (validator.isEmpty(data.from)) {
    errors.from = 'please specify a start date';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateExperience;
