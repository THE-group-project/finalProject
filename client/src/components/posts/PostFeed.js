import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostShow from './PostShow';

class PostFeed extends Component {
  render() {
    const { posts } = this.props;

    return posts.map(post => <PostShow key={post._id} post={post} />);
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostFeed;
