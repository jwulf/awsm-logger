"use strict";
var bunyan = require('bunyan'),
    Bunyan2Loggly = require('bunyan-loggly').Bunyan2Loggly;

function JawsLoggerLoggly(credentials) {
	return bunyan.createLogger({
		name: credentials.name,
		streams: [{
			type: 'raw',
			stream: new Bunyan2Loggly({
				token: credentials.token,
				subdomain: credentials.subdomain
			})
		}]
	});
}

module.exports = JawsLoggerLoggly;