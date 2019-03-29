import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextField from '../common/TextField';
import TextArea from '../common/TextArea';
import Input from '../common/Input';
import SelectList from '../common/SelectList';
import isEmpty from '../../validations/isEmpty';
import { createProfile, getCurrentProfile } from '../../actions/profile';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      bio: '',
      favoriteQuote: '',
      specialty: '',
      experienceLevel: '',
      skills: '',
      twitter: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {}
    };
  }

  componentDidMount = () => {
    this.props.getCurrentProfile();
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      const skillsCSV = profile.skills.join(',');

      // If profile field doesnt exist, make empty string
      profile.company = !isEmpty(profile.company) ? profile.company : '';
      profile.website = !isEmpty(profile.website) ? profile.website : '';
      profile.location = !isEmpty(profile.location) ? profile.location : '';
      profile.experienceLevel = !isEmpty(profile.experienceLevel)
        ? profile.experienceLevel
        : '';
      profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
      profile.specialty = !isEmpty(profile.specialty) ? profile.specialty : '';
      profile.favoriteQuote = !isEmpty(profile.favoriteQuote)
        ? profile.favoriteQuote
        : '';
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : '';
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : '';
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : '';
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : '';

      // Set component fields state
      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        experienceLevel: profile.experienceLevel,
        skills: skillsCSV,
        specialty: profile.specialty,
        favoriteQuote: profile.favoriteQuote,
        bio: profile.bio,
        twitter: profile.twitter,
        linkedin: profile.linkedin,
        youtube: profile.youtube,
        instagram: profile.instagram
      });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    this.props.createProfile(this.state, this.props.history);
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <Input
            placeholder="Twitter URL"
            name="twitter"
            icon="fab fa-fw fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            errors={errors.twitter}
          />
          <Input
            placeholder="Linkedin URL"
            name="linkedin"
            icon="fab fa-fw fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            errors={errors.linkedin}
          />
          <Input
            placeholder="Youtube URL"
            name="youtube"
            icon="fab fa-fw fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            errors={errors.youtube}
          />
          <Input
            placeholder="Instagram URL"
            name="instagram"
            icon="fab fa-fw fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            errors={errors.instagram}
          />
        </div>
      );
    }
    const options = [
      { label: '* What fitness category best describes you?', value: 0 },
      { label: 'Casual/Recreational', value: 'Casual/Recreational' },
      { label: 'Intermediate', value: 'Intermediate' },
      { label: 'Advanced/Athletic', value: 'Advanced/Athletic' },
      { label: 'Trainer/Certified Trainer', value: 'Trainer/Certified Trainer' },
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <Link to="/dashboard" className="text-warning mb-3 float-left">
              <span style={{ color: 'white' }}>
                <i className="fas fa-arrow-circle-left" /> Back to Buddies
              </span>
            </Link>
            <div className="jumbotron col-md-12 mx-auto border-0 rounded-0">
              <div className="col-md-8 m-auto">
                {/* <Link to="/dashboard" className="text-info">
                  Back
                </Link> */}
                <h1 className="display-4 text-center">Edit Your Profile</h1>
                <br />
                <form onSubmit={this.onSubmit}>
                  <TextField
                    placeholder="Profile Handle"
                    name="handle"
                    value={this.state.handle}
                    onChange={this.onChange}
                    error={errors.handle}
                  />
                  <SelectList
                    placeholder="Experience Level"
                    name="experienceLevel"
                    value={this.state.experienceLevel}
                    onChange={this.onChange}
                    options={options}
                    error={errors.experienceLevel}
                    info="This will be displayed on your profile to other users"
                  />
                  <TextField
                    placeholder="Website"
                    name="website"
                    value={this.state.website}
                    onChange={this.onChange}
                    error={errors.website}
                  />
                  <TextField
                    placeholder="Location"
                    name="location"
                    value={this.state.location}
                    onChange={this.onChange}
                    error={errors.location}
                  />
                  <TextField
                    placeholder="Company"
                    name="company"
                    value={this.state.company}
                    onChange={this.onChange}
                    error={errors.company}
                  />
                  <TextField
                    placeholder="Skills"
                    name="skills"
                    value={this.state.skills}
                    onChange={this.onChange}
                    error={errors.skills}
                    info="Please use comma separated values"
                  />
                  <TextField
                    placeholder="Specialty"
                    name="specialty"
                    value={this.state.specialty}
                    onChange={this.onChange}
                    error={errors.specialty}
                    info="If there's an area of training in which you specialize, please specify here"
                  />
                  <TextField
                    placeholder="Favorite Quote"
                    name="favoriteQuote"
                    value={this.state.favoriteQuote}
                    onChange={this.onChange}
                    error={errors.favoriteQuote}
                  />
                  <TextArea
                    placeholder="Bio"
                    name="bio"
                    value={this.state.bio}
                    onChange={this.onChange}
                    error={errors.bio}
                    info="Tell us a short description of who you are"
                  />
                  <div className="mb-3">
                    <button
                      type="button"
                      onClick={() => {
                        this.setState(prevState => ({
                          displaySocialInputs: !prevState.displaySocialInputs
                        }));
                      }}
                      className="btn btn-dark btn-sm"
                    >
                      Add Social Media Links
                    </button>
                    <span className="text-light">(Optional)</span>
                  </div>
                  {socialInputs}
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-warning btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(EditProfile);
