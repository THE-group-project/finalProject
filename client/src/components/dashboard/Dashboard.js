import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';
import Profile from './Profile';
import ShowExperience from './ShowExperience';
import ShowEducation from './ShowEducation';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick = e => {
    this.props.deleteAccount();
  };
  render() {
    // get user from auth state
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Hi,{' '}
              <Link className="text-muted" to={`/profile/${profile.handle}`}>
                {user.name}
              </Link>
            </p>
            <Profile />
            <ShowExperience experience={profile.experience} />
            <ShowEducation education={profile.education} />
            <div style={{ marginBottom: '60px' }} />
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-outline-danger"
            >
              Delete Account
            </button>
          </div>
        );
      } else {
        dashboardContent = (
          <div>
            {/* <p className="lead text-muted">Hi, {user.name}</p> */}
            {/* <p>
              Next, set up your Profile.
            </p> */}
            <Link to="/create-profile" className="btn">
              Edit Profile
            </Link>
          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Welcome {user.name}!</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.proptypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
