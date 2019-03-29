import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextArea from '../common/TextArea';
import { addComment } from '../../actions/post';

class CommentForm extends Component {
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
    const { postId } = this.props;

    const newComment = {
      content: this.state.content,
      name: user.name,
      avatar: user.avatar
    };
    this.props.addComment(postId, newComment);
    this.setState({ content: '' });
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-warning">
          <div className="card-header bg-warning text-white">Add a comment</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextArea
                  placeholder="create a post"
                  name="content"
                  value={this.state.content}
                  onChange={this.onChange}
                  error={errors.content}
                />
              </div>
              <button type="submit" className="btn btn-outline-warning">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addComment }
)(CommentForm);
