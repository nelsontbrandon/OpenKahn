const router = require('express').Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function(basePath) {
	if(!basePath.endsWith('/')) {
		basePath += '/';
	}

	passport.use(new GoogleStrategy({
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		callbackURL: basePath + 'auth/google/callback'
	}, (accessToken, refreshToken, profile, done) => {

	}));

	router.get('/auth/google', passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.login']}));
	router.get('/auth/google/callback', passport.authenticate('google', {
		successRedirect: '/',
		failureRedirect: '/login'
	}));

	return router;
};
