const express = require('express');
let books = require('./booksdb.js');
const regd_users = express.Router();

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

// Add a book review
regd_users.put('/auth/review/:isbn', (req, res) => {
	//Write your code here
	return res.status(300).json({ message: 'Yet to be implemented' });
});

module.exports.authenticated = regd_users;
