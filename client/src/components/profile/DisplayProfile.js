import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileHeader from './ProfileHeader';
import Spinner from '../common/Spinner';
import { getProfileByHandle } from '../../actions/profile';

class DisplayProfile extends Component {
  componentDidMount = () => {
    // retrieve handle from props
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  };
  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div className="mb-5">
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="text-warning mb-3 float-left">
                <span style={{ color: 'white' }}>
                  <i className="fas fa-arrow-circle-left" /> Back to Buddies
                </span>
              </Link>
            </div>
          </div>
          {/* pass profile from parent component */}
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          {/* <ProfileCreds
            experience={profile.experience}
            education={profile.education}
          /> */}
        </div>
      );
    }
    return (
      <div className="display-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

DisplayProfile.propTypes = {
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(DisplayProfile);
