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
          <div className="text-center">
            <p className="lead text-white mb-3 text-center greeting">
              Hi,{' '} {user.name}! {' '} <br></br>
              <Link className="btn btn-dark viewProfile mt-5 mb-2" to={`/profile/${profile.handle}`}>
                <i className="fas fa-user-circle" /> View Profile
              </Link>
            </p>
            <Profile />
            <ShowExperience experience={profile.experience} />
            <ShowEducation education={profile.education} />
            <div style={{ marginBottom: '100px' }} />
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-outline-danger deleteAcc"
            >
              Delete Account
            </button>
          </div>
        );
      } else {
        dashboardContent = (
          <div className="text-center">
            <p className="lead text-white mb-3 text-center greeting">Hi, {user.name}!</p>
            <p className="looksLike">
              It looks like you haven't set up a profile yet. You should!
            </p>
            <Link className="btn btn-lg btn-dark viewProfile mt-2 mb-2" to="/create-profile">
              Create Profile
            </Link>
          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="jumbotron mx-auto border-0 rounded-0">
              <div className="col-md-12">
                <h1 className="display-5 text-center dashboardTitle">MY DASHBOARD</h1>
                {dashboardContent}
              </div>
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
