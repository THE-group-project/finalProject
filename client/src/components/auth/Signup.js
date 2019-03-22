import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signupUser } from '../../actions/auth';
import TextField from '../common/TextField';

class Signup extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {}
  };

  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  };

  componentDidUpdate = prevProps => {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.signupUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
        <div className="signup mt-5">
          <div className="container mb-5">
            <div className="row mx-0">
              <div className="col-md-8 m-auto">
                <h1 className="display-4">Sign Up</h1>
                <p className="lead">
                  Create your Profile
                </p>
                <form onSubmit={this.onSubmit}>
                  <TextField
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    error={errors.name}
                  />

                  <TextField
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                    // info="Extra info?"
                  />

                  <TextField
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                  />
                  <TextField
                    placeholder="Confirm Password"
                    name="password2"
                    type="password"
                    value={this.state.password2}
                    onChange={this.onChange}
                    error={errors.password2}
                  />
                  <input
                    type="submit"
                    className="btn mt-4 mb-5"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

Signup.propTypes = {
  signupUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { signupUser }
)(withRouter(Signup));
