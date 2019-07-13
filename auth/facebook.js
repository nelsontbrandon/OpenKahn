const router = require('express').Router();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function (basePath) {
	if (!basePath.endsWith('/')) {
		basePath += '/';
	}

	passport.use(new FacebookStrategy({
		clientID: process.env.FACEBOOK_APP_ID,
		clientSecret: process.env.FACEBOOK_APP_SECRET,
		callbackURL: basePath + 'auth/facebook/callback'
	}, (accessToken, refreshToken, profile, done) => {

	}));

	router.get('/facebook', passport.authenticate('facebook'));
	router.get('/facebook/callback', passport.authenticate('facebook', {
		successRedirect: '/',
		failureRedirect: '/login'
	}));

	return router;
};
