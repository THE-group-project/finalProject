const validator = require('validator');
const isEmpty = require('./isEmpty');

const validateProfile = data => {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.bio = !isEmpty(data.bio) ? data.bio : '';
  data.experienceLevel = !isEmpty(data.experienceLevel)
    ? data.experienceLevel
    : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';

  if (!validator.isLength(data.handle, { min: 3, max: 25 })) {
    errors.handle = 'handle must be between 3 and 25 characters';
  }

  if (validator.isEmpty(data.handle)) {
    errors.handle = 'a profile handle is required';
  }

  if (validator.isEmpty(data.bio)) {
    errors.bio = 'a brief bio is required';
  }

  if (validator.isEmpty(data.experienceLevel)) {
    errors.experienceLevel = 'experience level is required';
  }

  if (validator.isEmpty(data.skills)) {
    errors.skills = 'skills are required (we know you have them)';
  }

  if (!isEmpty(data.website)) {
    if (!validator.isURL(data.website)) {
      errors.website = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!validator.isURL(data.youtube)) {
      errors.youtube = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!validator.isURL(data.instagram)) {
      errors.instagram = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!validator.isURL(data.twitter)) {
      errors.twitter = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!validator.isURL(data.linkedin)) {
      errors.linkedin = 'Not a valid URL';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateProfile;
