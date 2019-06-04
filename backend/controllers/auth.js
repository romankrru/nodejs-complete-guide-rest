const {validationResult} = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

exports.login = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	let loadedUser;

	User.findOne({email: email})
		.then(user => {
			if (!user) {
				const err = new Error(
					'A user with this email could not be found',
				);

				err.statusCode = 401;
				throw err;
			}

			loadedUser = user;
			return bcrypt.compare(password, user.password);
		})

		.then(isEqual => {
			if (!isEqual) {
				const err = new Error('Wrong password');
				err.statusCode = 401;
				throw err;
			}

			const token = jwt.sign(
				{
					email: loadedUser.email,
					userId: loadedUser._id.toString(),
				},

				process.env.JWT_SECRET,
				{expiresIn: '1h'},
			);

			res.status(200).json({
				token: token,
				userId: loadedUser._id.toString(),
			});
		})

		.catch(next);
};
