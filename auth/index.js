const twitter = require('./twitter');
const google = require('./google');
const facebook = require('./facebook');
const passport = require('passport');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const knex = require('../config/database');

module.exports = {
	passport: (app) => {
		passport.serializeUser(function (user, done) {
			done(null, user);
		});
		passport.deserializeUser(function (user, done) {
			done(null, user);
		});
		app.use(session({
			secret: process.env.SESSION_SECRET,
			resave: false,
			saveUninitialized: false,
			cookie: {httpOnly: true},
			store: new KnexSessionStore({
				knex: knex
			})
		}));
		app.use(passport.initialize());
		app.use(passport.session());
	},
	google: google,
	facebook: facebook,
	twitter: twitter
};
