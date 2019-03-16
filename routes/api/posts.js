const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../../models/Post');

const passport = require('passport');
const validatePost = require('../../validations/post');

router.get('/test', (req, res) => res.json({ msg: 'Post Works' }));

router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404));
});

router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404));
});

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePost(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      content: req.body.content,
      name: req.user.name,
      avatar: req.user.avatar,
      user: req.user.id
    });
    newPost.save().then(post => res.json(post));
  }
);

router.post(
  '/like/:postId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { postId } = req.params;

    Post.findById(postId, (err, foundPost) => {
      if (!foundPost || err) {
        res.status(404).json({ Error: err, Message: 'post not found' });
      }
      const index = foundPost.likes.findIndex(value => {
        return value.user == req.user.id;
      });
      if (index == -1) {
        foundPost.likes.push({ user: req.user.id });
      } else {
        foundPost.likes.splice(index, 1);
      }
      foundPost.save().then(savedPost => {
        res.status(200).json(savedPost);
      });
    });
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findOneAndRemove({ _id: req.params.id, user: req.user.id })
      .then(post => {
        return !post
          ? res.status(401).json({ post: 'post not found' })
          : res.status(200).json({ post: 'post deleted' });
      })
      .catch(err =>
        res.status(404).json({ post: 'there is a problem deleting the post' })
      );
  }
);

router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePost(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          content: req.body.content,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };
        // add to comments array
        post.comments.unshift(newComment);
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postNotFound: 'no post found' }));
  }
);

router.delete(
  '/:post_id/comment/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id)
      .then(post => {
        if (!post) {
          return res.status(404).json({ postNotFound: 'post not found' });
        }
        const commentDelete = post.comments.find(
          comment => comment._id == req.params.comment_id
        );
        if (!commentDelete) {
          return res.status(404).json({ comment: 'comment does not exist' });
        }
        // check if user is owner of the post or comment
        if (post.user != req.user.id) {
          if (commentDelete.user != req.user.id) {
            return res
              .json(401)
              .json({ notAuthorized: 'You cannot delete this comment' });
          }
        }
        // update comments array
        post
          .update({ $pull: { comments: { _id: req.params.comment_id } } })
          .then(() => res.json({ deletedComment: 'comment has been deleted' }))
          .catch(err => res.status(400).send(err));
      })
      .catch(err => res.status(400).json(err));
  }
);

module.exports = router;
