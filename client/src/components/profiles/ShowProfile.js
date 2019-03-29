import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validations/isEmpty';

class ShowProfile extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="card card-body bg-white border border-warning mb-3">
        <div className="row">
          <div className="col-2">
            <img className="rounded-cirlce" src={profile.user.avatar} alt="" />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3 className="font-weight-normal">{profile.user.name}</h3>
            <p className="lead">
              {isEmpty(profile.location) ? null : (
                <span>{profile.location}</span>
              )}
            </p>
            <Link to={`/profile/${profile.handle}`} className="text-warning">
              View Profile
            </Link>
          </div>
          <div className="col-md-4 d-none d-md-block">
            <h4 className="font-weight-normal">Skills</h4>
            <ul className="list-group-flush">
              {/* display only up to 4 skills */}
              {profile.skills.slice(0, 4).map((skill, index) => (
                <li key={index} className="list-group-item font-weight-light">
                  <i className="fa fa-check pr-1" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

ShowProfile.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ShowProfile;
