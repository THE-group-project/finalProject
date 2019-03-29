import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextArea from '../common/TextArea';
import { addPost } from '../../actions/post';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      errors: {}
    };
  }

  componentWillReceiveProps = newProps => {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { user } = this.props.auth;

    const newPost = {
      content: this.state.content,
      name: user.name,
      avatar: user.avatar
    };
    this.props.addPost(newPost);
    this.setState({ content: '' });
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-warning">
          <div className="card-header bg-warning text-white">
            Share your event idea with the community...
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextArea
                  placeholder="..."
                  name="content"
                  value={this.state.content}
                  onChange={this.onChange}
                  error={errors.content}
                />
              </div>
              <button type="submit" className="btn btn-outline-warning">
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);
