const {validationResult} = require('express-validator/check');

const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
	Post.find()
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

	const title = req.body.title;
	const content = req.body.content;

	const post = new Post({
		title: title,
		content: content,
		imageUrl: 'images/image.jpg',
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
