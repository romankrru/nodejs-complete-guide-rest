if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const feedRoutes = require('./routes/feed');

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${
	process.env.MONGO_PASSWORD
}@cluster0-22nab.mongodb.net/messages?retryWrites=true`;

const app = express();

app.use(bodyParser.json());

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

mongoose
	.connect(MONGODB_URI, {useNewUrlParser: true})

	.then(() => {
		console.log('Server started at http://localhost:1337');
		app.listen(1337);
	})

	.catch(err => console.error(err));
