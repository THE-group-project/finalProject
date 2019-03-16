import React from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <div className="d-flex flex-row-reverse">
      <div className="btn-group mb-4" role="group">
        <Link to="/edit-profile" className="btn btn-white text-dark">
          <i className="fas fa-user-circle text-info mr-1" /> Edit Profile
        </Link>
        <Link to="/add-experience" className="btn btn-white text-dark">
          <i className="fab fa-black-tie text-info mr-1" />
          Add Experience
        </Link>
        <Link to="/add-education" className="btn btn-white text-dark">
          <i className="fas fa-graduation-cap text-info mr-1" />
          Add Education
        </Link>
      </div>
    </div>
  );
};
export default Profile;
