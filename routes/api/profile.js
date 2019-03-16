const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const prependHttp = require('prepend-http');
const validateProfile = require('../../validations/profile');
const validateExperience = require('../../validations/experience');
const validateEducation = require('../../validations/education');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    // use profile model to find user
    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.none = "a profile doesn't exist for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// fetch all profiles
router.get('/all', (req, res) => {
  const errors = {};

  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.none = 'no profiles found';
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json(errors));
});

// fetch profile by handle
router.get('/handle/:handle', (req, res) => {
  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.none = "It doesn't look like there's a profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// fetch profile by userid
router.get('/user/:user_id', (req, res) => {
  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.none = "It doesn't looke like there's a profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// create and update profile
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfile(req.body);
    // check validations

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const profileFields = {};
    profileFields.user = req.user.id;
    profileFields.social = {};

    const whiteList = [
      'handle',
      'website',
      'bio',
      'experienceLevel',
      'location',
      'skills',
      'youtube',
      'twitter',
      'instagram',
      'facebook',
      'linkedin',
      'favoriteQuote',
      'specialty'
    ];
    const inputData = Object.keys(req.body);

    for (key of inputData) {
      if (whiteList.includes(key)) {
        if (key === 'skills' && typeof req.body.skills !== 'undefined') {
          profileFields[key] = req.body.skills.split(',');
        } else if (
          ['youtube', 'twitter', 'instagram', 'linkedin'].includes(key) &&
          req.body[key]
        ) {
          profileFields.social[key] = prependHttp(req.body[key], {
            https: true
          });
        } else if (req.body[key]) {
          profileFields[key] = req.body[key];
        }
      }
    }

    Profile.findOne({ handle: profileFields.handle }).then(profile => {
      if (profile && profile.user != req.user.id) {
        errors.handle = 'this handle already exists';
        res.status(400).json(errors);
      } else {
        Profile.findOne({ user: req.user.id }).then(profile => {
          if (profile) {
            Profile.findOneAndUpdate(
              {
                user: req.user.id
              },
              {
                $set: profileFields
              },
              { new: true }
            ).then(profile => res.json(profile));
          } else {
            new Profile(profileFields)
              .save()
              .then(profile => res.json(profile));
          }
        });
      }
    });
  }
);

router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperience(req.body);

    if (!isValid) {
      return res.status(404).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newXP = req.body;

      profile.experience.unshift(newXP);
      profile.save().then(profile => res.json(profile));
    });
  }
);

router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducation(req.body);

    if (!isValid) {
      return res.status(404).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = req.body;

      profile.education.unshift(newEdu);
      profile.save().then(profile => res.json(profile));
    });
  }
);

router.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        profile.experience.remove({ _id: req.params.exp_id });
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

router.delete(
  '/education/:edu_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        profile.education.remove({ _id: req.params.edu_id });
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

router.delete(
  '/education/:edu_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        profile.education.remove({ _id: req.params.edu_id });
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);
module.exports = router;
