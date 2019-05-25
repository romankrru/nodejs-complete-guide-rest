if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const uuidv4 = require('uuid/v4');

const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${
	process.env.MONGO_PASSWORD
}@cluster0-22nab.mongodb.net/messages?retryWrites=true`;

const app = express();

const fileStorage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, 'images'),
	filename: (req, file, cb) => cb(null, `${uuidv4()}__${file.originalname}`),
});

const fileFilter = (req, file, cb) => {
	if (['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

app.use(bodyParser.json());

app.use(
	multer({
		storage: fileStorage,
		fileFilter: fileFilter,
	}).single('image'),
);

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');

	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, PATCH, DELETE',
	);

	res.setHeader(
		'Access-Control-Allow-Headers',
		'Content-Type, Authorization',
	);

	next();
});

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

// register error handling middleware
app.use((error, req, res, next) => {
	console.error(error);
	const message = error.message;
	const status = error.statusCode || 500;
	res.status(status).json({message: message});
});

mongoose
	.connect(MONGODB_URI, {useNewUrlParser: true})

	.then(() => {
		console.log('Server started at http://localhost:1337');
		app.listen(1337);
	})

	.catch(err => console.error(err));
