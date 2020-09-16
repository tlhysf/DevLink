const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Profile = require('../../models/Profile');
const User = require('../../models/Users');

const validateProfileInput = require('../../validation/profile');
const validateNewExpInput = require('../../validation/experience');
const validateNewEduInput = require('../../validation/education');

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'profile test' }));

// @route   GET api/profile/
// @desc    Get current user profile
// @access  Private
router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const errors = {};

		Profile.findOne({ user: req.user.id })
			.populate('user', ['name', 'avatar'])
			.then((profile) => {
				if (!profile) {
					errors.noProfile = 'Profile for this user doesnt exist';
					return res.status(404).json(errors);
				}

				res.json(profile);
			})
			.catch((err) => res.status(404).json(err));
	}
);

// @route   POST api/profile/
// @desc    Create or edit user profile
// @access  Private
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validateProfileInput(req.body);

		if (!isValid) {
			return res.status(400).json(errors);
		}

		const profileFields = {};
		profileFields.user = req.user.id;

		if (req.body.handle) profileFields.handle = req.body.handle;

		if (req.body.company) profileFields.company = req.body.company;

		if (req.body.website) profileFields.website = req.body.website;

		if (req.body.location) profileFields.location = req.body.location;

		if (req.body.bio) profileFields.bio = req.body.bio;

		if (req.body.status) profileFields.status = req.body.status;

		if (req.body.github) profileFields.github = req.body.github;

		if (typeof req.body.skills !== 'undefined') {
			profileFields.skills = req.body.skills.split(',');
		}

		profileFields.social = {};

		if (req.body.linkedIn)
			profileFields.social.linkedIn = req.body.linkedIn;
		if (req.body.stackOverFlow)
			profileFields.social.stackOverFlow = req.body.stackOverFlow;

		Profile.findOne({ user: req.user.id }).then((profile) => {
			if (profile) {
				// update
				Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: profileFields },
					{ new: true }
				).then((profile) => res.json(profile));
			} else {
				//Create
				Profile.findOne({ handle: profileFields.handle }).then(
					(profile) => {
						if (profile) {
							errors.handle = 'This handle already exists';
							res.status(400).json(errors);
						}

						new Profile(profileFields)
							.save()
							.then((profile) => res.json(profile));
					}
				);
			}
		});
	}
);

// // @route   POST api/profile/avatar-upload
// // @desc    Upload avatar
// // @access  Private
// router.post(
// 	'/avatar-upload',
// 	passport.authenticate('jwt', { session: false }),
// 	(req, res) => {
// 		const errors = {};

// 		if (req.files === null) {
// 			errors.avatar = 'No file uploaded';
// 			return res.status(400).json(errors);
// 		}

// 		const file = req.files.file;

// 		User.findOne({ name: req.user.name }).then((user) => {
// 			if (user) {
// 				// file.mv(
// 				// 	`${__dirname}../../../client/public/uploads/${file.name}`,
// 				// 	(err) => {
// 				// 		if (err) {
// 				// 			console.error(err);
// 				// 			return res.status(500).json(err);
// 				// 		}
// 				// 		res.json({
// 				// 			fileName: file.name,
// 				// 			filePath: `/uploads/${file.name}`,
// 				// 		});
// 				// 	}
// 				// );

// 				// store an img in binary in mongo

// 				const userAvatar = new User();
// 				userAvatar.avatar.data = file;
// 				userAvatar.avatar.type = file.name;

// 				User.findOneAndUpdate(
// 					{ name: req.user.name },
// 					{ $set: { avatar: userAvatar.avatar } },
// 					{ new: true }
// 				)
// 					.then((user) => res.json(user.avatar.type))
// 					.catch((err) => res.status(404).json(err));
// 			}
// 		});
// 	}
// );

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get('/handle/:handle', (req, res) => {
	const errors = {};

	Profile.findOne({ handle: req.params.handle })
		.populate('user', ['name', 'avatar'])
		.then((profile) => {
			if (!profile) {
				errors.noProfile = 'No profile found';
				res.status(404).json(errors);
			}

			res.json(profile);
		})
		.catch((err) => res.status(404).json(err));
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by ID
// @access  Public
router.get('/user/:user_id', (req, res) => {
	const errors = {};

	Profile.findOne({ user: req.params.user_id })
		.populate('user', ['name', 'avatar'])
		.then((profile) => {
			if (!profile) {
				errors.noProfile = 'No profile found';
				res.status(404).json(errors);
			}

			res.json(profile);
		})
		.catch((err) => res.status(404).json(err));
});

// @route   GET api/profile/all
// @desc    Get all public profiles
// @access  Public
router.get('/all', (req, res) => {
	const errors = {};

	Profile.find()
		.populate('user', ['name', 'avatar'])
		.then((profiles) => {
			if (!profiles) {
				errors.noProfile = 'No public profiles found';
				res.status(404).json(errors);
			}

			res.json(profiles);
		})
		.catch((err) => res.status(404).json(err));
});

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post(
	'/experience',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validateNewExpInput(req.body);

		if (!isValid) {
			return res.status(400).json(errors);
		}

		Profile.findOne({ user: req.user.id }).then((profile) => {
			const newExp = {
				title: req.body.title,
				company: req.body.company,
				location: req.body.location,
				from: req.body.from,
				to: req.body.to,
				description: req.body.description,
				current: req.body.current,
			};

			//Add every new experience to the experience array
			profile.experience.unshift(newExp);
			profile.save().then((profile) => res.json(profile));
		});
	}
);

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post(
	'/education',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validateNewEduInput(req.body);

		if (!isValid) {
			return res.status(400).json(errors);
		}

		Profile.findOne({ user: req.user.id }).then((profile) => {
			const newEdu = {
				school: req.body.school,
				degree: req.body.degree,
				fieldOfStudy: req.body.fieldOfStudy,
				from: req.body.from,
				to: req.body.to,
				description: req.body.description,
				current: req.body.current,
			};

			//Add every new education to the education array
			profile.education.unshift(newEdu);
			profile.save().then((profile) => res.json(profile));
		});
	}
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete(
	'/experience/:exp_id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Profile.findOne({ user: req.user.id })
			.then((profile) => {
				// get index of experience to remove
				const removeIndex = profile.experience
					.map((item) => item.id)
					.indexOf(req.params.exp_id);

				// splice it off
				profile.experience.splice(removeIndex, 1);

				// resave
				profile.save().then((profile) => res.json(profile));
			})
			.catch((err) => res.status(404).json(err));
	}
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete(
	'/education/:edu_id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Profile.findOne({ user: req.user.id })
			.then((profile) => {
				// get index of education to remove
				const removeIndex = profile.education
					.map((item) => item.id)
					.indexOf(req.params.edu_id);

				// splice it off
				profile.education.splice(removeIndex, 1);

				// resave
				profile.save().then((profile) => res.json(profile));
			})
			.catch((err) => res.status(404).json(err));
	}
);

// @route   DELETE api/profile/
// @desc    Delete user account
// @access  Private
router.delete(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Profile.findOneAndRemove({ user: req.user.id })
			.then(() => {
				User.findOneAndRemove({ _id: req.user.id }).then(() => {
					res.json({ success: true });
				});
			})
			.catch((err) => res.status(404).json(err));
	}
);

module.exports = router;
