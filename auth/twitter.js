const router = require('express').Router();
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;

passport.use(new TwitterStrategy({
	consumerKey: process.env.TWITTER_CONSUMER_KEY,
	consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
	callbackURL: (process.env.DEBUG ? 'http://localhost' : `https://${process.env.ROOT_URL}`) + '/auth/twitter/callback'
}, (token, tokenSecret, profile, done) => {

}));

router.get('/auth/twitter', passport.authenticate('twitter'));
router.get('/auth/twitter/callback', passport.authenticate('twitter', {
	successRedirect: '/',
	failureRedirect: '/login'
}));
