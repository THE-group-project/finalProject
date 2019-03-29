import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    const firstName = profile.user.name.trim().split(' ')[0];

    const skills = profile.skills.map((skill, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check" />
        {skill}
      </div>
    ));
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-white mb-3">
            <h3 className="text-center text-warning font-weight-light">
              A little about {firstName}
            </h3>
            <p className="lead">{profile.bio}</p>
            <hr />
            <h3 className="text-center text-warning font-weight-light">
              Skill Set
            </h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {skills}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};
export default ProfileAbout;
