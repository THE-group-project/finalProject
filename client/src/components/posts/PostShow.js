import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deletePost, likePost } from '../../actions/post';
import { Link } from 'react-router-dom';

class PostShow extends Component {
  onDeleteClick = id => {
    this.props.deletePost(id);
  };

  onLikeClick = id => {
    this.props.likePost(id);
  };

  // used to see to if the like icon should change colors based if a user already liked a post
  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { post, auth, showActions } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <img
              className="rounded-circle d-none d-md-block"
              src={post.avatar}
              alt=""
            />

            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.content}</p>
            {showActions ? (
              <span>
                <button
                  onClick={this.onLikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={`${
                      this.findUserLike(post.likes)
                        ? 'text-info'
                        : 'text-secondary'
                    } fas fa-thumbs-up`}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-warning mr-1">
                  Comments
                </Link>
                {post.user === auth.user.id ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, post._id)}
                    type="button"
                    className="btn btn-outline-danger"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

// set showActions to true be default
PostShow.defaultProps = {
  showActions: true
};
PostShow.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  likePost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost, likePost }
)(PostShow);
