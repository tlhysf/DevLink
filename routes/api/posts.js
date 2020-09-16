const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

const validatePost = require('../../validation/post');

// @route   GET api/posts/test
// @desc    Tests posts route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'posts test' }));

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validatePost(req.body);

		if (!isValid) {
			return res.status(400).json(errors);
		}

		const newPost = new Post({
			text: req.body.text,
			name: req.body.name,
			avatar: req.body.avatar,
			user: req.user.id,
		});

		newPost.save().then((post) => res.json(post));
	}
);

// @route   GET api/posts
// @desc    Get post
// @access  Public
router.get('/', (req, res) => {
	Post.find()
		.sort({ date: -1 })
		.then((posts) => res.json(posts))
		.catch((err) =>
			res.status(404).json({ noPostsFound: 'No posts found' })
		);
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req, res) => {
	Post.findById(req.params.id)
		.then((post) => res.json(post))
		.catch((err) =>
			res.status(404).json({ postNotFound: 'Post not found' })
		);
});

// @route   DELETE api/posts/:id
// @desc    Delete post by id
// @access  Private
router.delete(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Profile.findOne({ user: req.user.id }).then((profile) => {
			Post.findById(req.params.id).then((post) => {
				try {
					// check if the user sending delete req is the owner of the post
					if (post.user.toString() !== req.user.id) {
						return res
							.status(401)
							.json({ notAuthorized: 'Action not authorized' });
					} else {
						post.remove().then(() => res.json({ success: true }));
					}
				} catch (error) {
					res.status(404).json({ postNotFound: 'Post not found' });
				}
			});
		});
	}
);

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private
router.post(
	'/like/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Profile.findOne({ user: req.user.id }).then((profile) => {
			Post.findById(req.params.id)
				.then((post) => {
					//check if user has already liked the post
					if (
						post.likes.filter(
							(like) => like.user.toString() === req.user.id
						).length > 0
					) {
						return res
							.status(400)
							.json({ alreadyLiked: 'post already liked' });
					}

					//Add like by user id
					post.likes.unshift({ user: req.user.id });

					post.save().then((post) => res.json(post));
				})
				.catch((err) =>
					res.status(404).json({ postNotFound: 'Post not found' })
				);
		});
	}
);

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post(
	'/unlike/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Profile.findOne({ user: req.user.id }).then((profile) => {
			Post.findById(req.params.id)
				.then((post) => {
					//check if user has liked the post
					if (
						(post.likes.filter(
							(like) => like.user.toString() === req.user.id
						).length = 0)
					) {
						return res.status(400).json({
							notLiked: 'You have not yet liked this post',
						});
					}

					//Remove like by user id

					//Get remove index
					const removeIndex = post.likes.map((item) =>
						item.user.toString().indexOf(req.user.id)
					);

					//Splice
					post.likes.splice(removeIndex, 1);

					post.save().then((post) => res.json(post));
				})
				.catch((err) =>
					res.status(404).json({ postNotFound: 'Post not found' })
				);
		});
	}
);

// @route   POST api/posts/comment/:id
// @desc    Add a comment to post
// @access  Private
router.post(
	'/comment/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validatePost(req.body);

		if (!isValid) {
			return res.status(400).json(errors);
		}

		Post.findById(req.params.id)
			.then((post) => {
				const newComment = {
					text: req.body.text,
					name: req.body.name,
					avatar: req.body.avatar,
					user: req.user.id,
				};

				post.comments.unshift(newComment);

				post.save().then((post) => res.json(post));
			})
			.catch((err) =>
				res.status(404).json({ postNotFound: 'Post not found' })
			);
	}
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove a comment to post
// @access  Private
router.delete(
	'/comment/:id/:comment_id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Post.findById(req.params.id)
			.then((post) => {
				//Check if the comment exists
				if (
					post.comments.filter(
						(item) => item._id.toString() === req.params.comment_id
					).length === 0
				) {
					return res
						.status(404)
						.json({ commentNotFound: 'Comment does not exist' });
				}

				const removeIndex = post.comments.map((item) =>
					item._id.toString().indexOf(req.params.comment_id)
				);

				post.comments.splice(removeIndex, 1);

				post.save().then((post) => res.json(post));
			})
			.catch((err) =>
				res.status(404).json({ postNotFound: 'Post not found' })
			);
	}
);

module.exports = router;
