import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextField from '../common/TextField';
import TextArea from '../common/TextArea';
import Input from '../common/Input';
import SelectList from '../common/SelectList';
import { createProfile } from '../../actions/profile';

class CreateProfile extends Component {
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
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
            <div className="jumbotron col-md-12 mx-auto border-0 rounded-0">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Create Your Profile</h1>
                <br />
                <form onSubmit={this.onSubmit}>
                  <TextField
                    placeholder="Username"
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
                  {/* <TextField
                    placeholder="Website"
                    name="website"
                    value={this.state.website}
                    onChange={this.onChange}
                    error={errors.website}
                  /> */}
                  <TextField
                    placeholder="Location"
                    name="location"
                    value={this.state.location}
                    onChange={this.onChange}
                    error={errors.location}
                  />
                  {/* <TextField
                    placeholder="Company"
                    name="company"
                    value={this.state.company}
                    onChange={this.onChange}
                    error={errors.company}
                  /> */}
                  <TextField
                    placeholder="Favorite Exercises"
                    name="skills"
                    value={this.state.skills}
                    onChange={this.onChange}
                    error={errors.skills}
                    info="*Please use comma separated values"
                  />
                  <TextField
                    placeholder="Hobbies"
                    name="specialty"
                    value={this.state.specialty}
                    onChange={this.onChange}
                    error={errors.specialty}
                    // info="If there's an area of training in which you specialize, please specify here"
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
                    info="*Tell us a short description of who you are"
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

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(CreateProfile);
