const fs = require('fs');
const path = require('path');

const {validationResult} = require('express-validator/check');

const Post = require('../models/post');

const clearImage = imagePath => {
	const resolvedPath = path.join(__dirname, '..', imagePath);

	fs.unlink(resolvedPath, err => {
		if (err) console.log(err);
	});
};

exports.getPosts = (req, res, next) => {
	Post.find()
		.sort({createdAt: -1})

		.then(posts => {
			res.status(200).json(posts);
		})

		.catch(next);
};

exports.createPost = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const error = new Error('Validation failed, entered data is incorrect');
		error.statusCode = 422;
		throw error;
	}

	if (!req.file) {
		const error = new Error('No image provided!');
		error.statusCode = 422;
		throw error;
	}

	const title = req.body.title;
	const content = req.body.content;
	const imageUrl = req.file.path;

	const post = new Post({
		title: title,
		content: content,
		imageUrl: imageUrl,
		creator: {name: 'Roman'},
	});

	post.save()
		.then(result => {
			res.status(201).json({
				message: 'Post created successfully!',
				post: result,
			});
		})

		.catch(err => {
			if (!error.statusCode) {
				error.statusCode = 500;
			}

			next(err);
		});
};

exports.getPost = (req, res, next) => {
	const postId = req.params.postId;

	Post.findById(postId)
		.then(post => {
			if (!post) {
				const err = new Error('Post not found');
				err.statusCode = 404;
				throw err;
			}

			res.status(200).json(post);
		})

		.catch(err => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}

			next(err);
		});
};

exports.updatePost = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const error = new Error('Validation failed, entered data is incorrect');
		error.statusCode = 422;
		throw error;
	}

	const postId = req.params.postId;
	const title = req.body.title;
	const content = req.body.content;

	let imageUrl = req.body.imageUrl;

	if (req.file) {
		imageUrl = req.file.path;
	}

	if (!imageUrl) {
		const err = new Error('No file picked.');
		err.statusCode = 422;
		throw err;
	}

	Post.findById(postId)
		.then(post => {
			if (!post) {
				const err = new Error('Could not find post');
				err.statusCode = 404;
				throw err;
			}

			if (imageUrl !== post.imageUrl) {
				clearImage(post.imageUrl);
			}

			post.title = title;
			post.imageUrl = imageUrl;
			post.content = content;

			return post.save();
		})

		.then(post => {
			res.status(200).json({message: 'Post updated', post: post});
		})

		.catch(next);
};
