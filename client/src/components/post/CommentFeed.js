import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommentShow from './CommentShow';

class CommentFeed extends Component {
  render() {
    const { comments, postId } = this.props;
    return comments.map(comment => (
        <CommentShow key={comment._id} comment={comment} postId={postId} />
    ));
  }
}

CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired
};

export default CommentFeed;
