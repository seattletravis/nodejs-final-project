const express = require('express');
let books = require('./booksdb.js');
const { send } = require('vite');
let isValid = require('./auth_users.js').isValid;
let users = require('./auth_users.js').users;
const public_users = express.Router();

public_users.post('/register', (req, res) => {
	//Write your code here
	return res.status(300).json({ message: 'Yet to be implemented' });
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
	//Write your code here
	return res.status(300).json({ message: 'Yet to be implemented' });
});

module.exports.general = public_users;
