const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');

let books = require('./booksdb.js');
const { send } = require('vite');
// let isValid = require('./auth_users.js').isValid;
// let users = require('./auth_users.js').users;
// let authenticatedUser = require('./auth_users.js').authenticatedUser;

const public_users = express.Router();

let users = [];

const isValid = (username) => {
	let userswithsamename = users.filter((user) => {
		return user.username === username;
	});
	if (userswithsamename.length > 0) {
		return true;
	} else {
		return false;
	}
};

const authenticatedUser = (username, password) => {
	let validusers = users.filter((user) => {
		return user.username === username && user.password === password;
	});
	if (validusers.length > 0) {
		return true;
	} else {
		return false;
	}
};

public_users.use(
	session({ secret: 'fingerpint' }, (resave = true), (saveUninitialized = true))
);

//only registered users can login
public_users.post('/login', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	if (!username || !password) {
		return res.status(404).json({ message: 'Error logging in' });
	}

	if (authenticatedUser(username, password)) {
		let accessToken = jwt.sign(
			{
				data: password,
			},
			'access',
			{ expiresIn: 60 * 60 }
		);

		req.session.authorization = {
			accessToken,
			username,
		};
		return res.status(200).send('User successfully logged in');
	} else {
		return res
			.status(208)
			.json({ message: 'Invalid Login. Check username and password' });
	}
});

public_users.post('/register', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	if (username && password) {
		if (!isValid(username)) {
			users.push({ username: username, password: password });
			return res
				.status(200)
				.json({ message: 'User successfully registered. You can now login' });
		} else {
			return res.status(404).json({ message: 'User already exists!' });
		}
	}
	return res.status(404).json({ message: 'Unable to register user.' });
});

// Get the book list available in the shop - DONE
public_users.get('/', function (req, res) {
	res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN - DONE
public_users.get('/isbn/:isbn', function (req, res) {
	const isbn = req.params.isbn;
	res.send(books[isbn]);
});

// Get book details based on author - DONE
public_users.get('/author/:author', function (req, res) {
	const author = req.params.author;
	const keys = [];
	for (const [key, _] of Object.entries(books)) {
		keys.push(key);
	}
	keys.forEach((el) => {
		if (author === books[el].author) {
			res.send(books[el]);
		}
	});
});

// Get all books based on title - DONE
public_users.get('/title/:title', function (req, res) {
	const title = req.params.title;
	const keys = [];
	for (const [key, _] of Object.entries(books)) {
		keys.push(key);
	}
	keys.forEach((el) => {
		if (title === books[el].title) {
			res.send(books[[el]]);
		}
	});
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
	const isbn = req.params.isbn;
	res.send(books[isbn].reviews);
});

module.exports.general = public_users;
