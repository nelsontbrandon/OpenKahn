const router = require('express').Router();
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;

module.exports = function (basePath) {
	if (!basePath.endsWith('/')) {
		basePath += '/';
	}

	passport.use(new TwitterStrategy({
		consumerKey: process.env.TWITTER_CONSUMER_KEY,
		consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
		callbackURL: basePath + 'auth/twitter/callback'
	}, (token, tokenSecret, profile, done) => {

	}));

	router.get('/auth/twitter', passport.authenticate('twitter'));
	router.get('/auth/twitter/callback', passport.authenticate('twitter', {
		successRedirect: '/',
		failureRedirect: '/login'
	}));

	return router;
};
