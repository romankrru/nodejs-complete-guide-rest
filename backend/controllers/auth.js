const {validationResult} = require('express-validator/check');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.signup = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const error = new Error('Validation failed');
		error.statusCode = 422;
		error.fields = errors.array();
		throw error;
	}

	const email = req.body.email;
	const password = req.body.password;
	const name = req.body.name;

	bcrypt
		.hash(password, 12)

		.then(hashedPassword => {
			const user = new User({
				email: email,
				password: hashedPassword,
				name: name,
			});

			return user.save();
		})

		.then(user => {
			res.status(200).json({message: 'User created', userId: user._id});
		})

		.catch(next);
};
