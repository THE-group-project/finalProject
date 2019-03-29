import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {
  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  };

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="jumbotron mx-auto border-0 rounded-0">
                <div className="col-md-12 text-center">
                  <div className="title_tagline">
                    <h1 className="display-3 title">FITNESS</h1>
                    <p className="lead tagline mb-4">
                      {' '}
                      Find your training buddy!
                    </p>
                  </div>
                  <Link to="/signup" className="btn btn-lg btn-outline-warning mr-2">
                    Sign Up
                  </Link>
                  <Link to="/login" className="btn btn-lg btn-outline-dark">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
