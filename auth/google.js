const router = require('express').Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const {User, UserLogin} = require('../models');
const uuid = require('uuid/v1');

module.exports = function (basePath) {
	if (!basePath.endsWith('/')) {
		basePath += '/';
	}

	passport.use(new GoogleStrategy({
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		callbackURL: basePath + 'auth/google/callback'
	}, async (accessToken, refreshToken, profile, done) => {
		console.info(profile);
		const userLogin = await UserLogin.query().findOne({
			login_provider: 'google',
			provider_key: profile.id
		});
		if(!userLogin) {
			const user = await User.query().insertAndFetch({
				id: uuid(),
				email: profile.emails[0].value,
				confirmed: profile.emails[0].verified,
				first_name: profile.name.givenName,
				last_name: profile.name.familyName,
				nick_name: profile.displayName
			});
			if(user) {
				await UserLogin.query().insert({
					login_provider: 'google',
					provider_key: profile.id,
					user_id: user.id
				});
				done(null, user);

			}
			else {
				done("failed to create user");

			}
		}
		else {
			const user = await User.query().findById(userLogin.user_id);
			done(null, user);
		}
	}));

	router.get('/auth/google', passport.authenticate('google', {scope: ['email', 'profile', 'openid']}));
	router.get('/auth/google/callback', passport.authenticate('google', {
		successRedirect: '/',
		failureRedirect: '/login'
	}), function (req, res) {
		res.redirect('/');
	});

	return router;
};
