const validator = require('validator');
const isEmpty = require('./isEmpty');

const validateEducation = data => {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : '';
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  data.fieldofStudy = !isEmpty(data.fieldofStudy) ? data.fieldofStudy : '';

  if (validator.isEmpty(data.school)) {
    errors.school = 'school field is required';
  }

  if (validator.isEmpty(data.degree)) {
    errors.degree = 'degree field is required';
  }

  if (validator.isEmpty(data.fieldofStudy)) {
    errors.fieldofStudy = 'please specify a field of study';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateEducation;
