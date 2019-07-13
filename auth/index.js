const express = require('express');
const router = express.Router;
const twitter = require('twitter');
const google = require('Google');
const facebook = require('Facebook');

module.exports = {
	google: google,
	facebook: facebook,
	twitter: twitter
};
