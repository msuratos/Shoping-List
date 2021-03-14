require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const verifyToken = require('../verify-token');
const bcrypt = require('bcrypt');
const db = require('../config/db');

const router = express.Router();

const jwtKey = process.env.JWT_KEY
const jwtExpirySeconds = parseInt(process.env.JWT_EXPIRY_SECS, 10);

router.get('/', (req, res) => {
    res.status(500);
    res.statusMessage = 'Can\'t use this get endpoint';
    res.send('Can\'t use this get endpoint');
});

router.post('/register', (req, res) => {
    // Get credentials from JSON body
	const { username, password } = req.body;
	if (!username || !password) {
		// return 401 error is username or password doesn't exist, or if password does
		// not match the password in our records
		return res.status(401).end();
	}

	// Check password hash from db
	bcrypt.hash(password, 10, function(err, hash) {
		if (err)
		{
			console.log(err);
			res.statusMessage = 'Could not hash properly';
			res.status(500);
		}
		else {
			db.get('users').insert({
				username,
				passwordhash: hash
			}).then((user) => {
				console.log(`New users has been inserted to mongo database: ${user.username}`);
				return res.sendStatus(200);
			}).catch(err => {
				console.log(err);				
				res.statusMessage = 'Could not save to database.';
				res.status(500);
			}).then(() => db.close());
		}
	});
});

router.post('/signin', (req, res) => {
    // Get credentials from JSON body
	const { username, password } = req.body;
	if (!username || !password) {
		// return 401 error is username or password doesn't exist, or if password does
		// not match the password in our records
		return res.status(401).end();
	}

	// Check password hash from db
	db.get('users').findOne({ username: username }).then((user) => {
		if (user === null || user === undefined) {
			res.statusMessage = 'Invalid user';
			res.status(500);
			return res.end();
		}

		bcrypt.compare(password, user.passwordhash, function(err, result) {
			if (result) {
				// Create a new token with the username in the payload
				// and which expires 300 seconds after issue
				const token = jwt.sign({ username }, jwtKey, {
					algorithm: "HS256",
					expiresIn: jwtExpirySeconds,
				});
				console.log("token:", token);

				// set the cookie as the token string, with a similar max age as the token
				// here, the max age is in milliseconds, so we multiply by 1000
				res.cookie("token", token, { maxAge: jwtExpirySeconds * 1000 });
				res.end();
			} else {
				console.log(err);
				res.statusMessage = 'Incorrect password';
				res.status(403);
			}
		});
	}).catch((error) => {
		console.log('Error has occurred in password hash match', error);
		res.statusMessage = 'Incorrect password hash match';
		res.status(500);

		return res.end();
	});
});

router.get('/refresh', verifyToken, (req, res) => {
    const token = req.cookies.token;

	if (!token) {
		return res.status(401).end();
	}

	var payload;
	try {
		payload = jwt.verify(token, jwtKey);
	} catch (e) {
		if (e instanceof jwt.JsonWebTokenError) {
			return res.status(401).send(e);
		}
		return res.status(400).send(e);
	}

	// We ensure that a new token is not issued until enough time has elapsed
	// In this case, a new token will only be issued if the old token is within
	// 30 seconds of expiry. Otherwise, return a bad request status
	const nowUnixSeconds = Math.round(Number(new Date()) / 1000);
	if (payload.exp - nowUnixSeconds > 30) {
        console.log(`Expired datetime ${payload.exp} || Current datetime ${nowUnixSeconds}`)
		return res.status(400).end();
	}

	// Now, create a new token for the current user, with a renewed expiration time
	const newToken = jwt.sign({ username: payload.username }, jwtKey, {
		algorithm: "HS256",
		expiresIn: jwtExpirySeconds,
	});

	// Set the new token as the users `token` cookie
	res.cookie("token", newToken, { maxAge: jwtExpirySeconds * 1000 });
	res.end();
});

module.exports = router;