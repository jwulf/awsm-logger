"use strict";

/**
 * Wraps a logging library and resolves a promise when all log messages have been written
 * 
 * 
 * Credentials for Papertrail:
 *     {
            level: 'info',
            hostname: 'hostname',
            host: 'logs3.papertrailapp.com',
            port: 134324
        }
 */
var debug = require('debug')('Logging'),
	JawsLoggerPapertrail = require('./jaws-logger-papertrail.js'),
	JawsLoggerLoggly = require('./jaws-logger-loggly.js');

class JawsLogger {
	constructor(id, loggerTransport, credentials) {
		this.count = 0;
		this.id_ = id + ' ' || 'Logger ';
		this.ns = '';
		loggerTransport = loggerTransport || "console";
		this.loggerTransport = loggerTransport;
		switch(loggerTransport) {
			case "papertrail":
				this.logger = JawsLoggerPapertrail(credentials);
				break;
			case "loggly":
				this.logger = JawsLoggerLoggly(credentials);
				break;
			default:
				var JawsLoggerConsole = require('./jaws-logger-console.js');
				this.logger = JawsLoggerConsole;
		}

		this.logger.on('logging', () => {
			this.count--;
			if (this.count === 0 && this.resolution) return this.resolution();
		});
		var startupmsg = this.loggerTransport + ' logger started';
		this.info(startupmsg);
	}

	id(loggerid) {
		this.id_ = loggerid + ' ';
		this.info('configured.');
	}
	
	bindResolve(resolve) {
		return (data => {
			console.log(this.count);
			if (this.count == 0) return resolve(data);
			this.resolution = function(){resolve(data)};
		});
	}
	
	bindReject(reject) {
		return (data => {
			if (this.count == 0) return reject(data);
			this.resolution = function(){reject(data)};
		});
	}

	namespace(ns)
	{
		this.ns = ns;	
	}
	
	info(msg) {
		var strmsg, logmsg = msg;
		if (typeof msg === 'object') { 
			strmsg = this.id_ + this.ns + JSON.stringify(msg);
			logmsg.logid = this.id_;
		}
		if (typeof msg === 'string') {
			strmsg = logmsg = this.id_ + this.ns + msg;
		}
		
        this.count++;
		if (this.loggerTransport !== "console") {
			console.log(strmsg);
		}
		if (this.loggerTransport == 'loggly') this.logger.info(msg);
		if (this.loggerTransport == 'papertrail') this.logger.info(strmsg);
    }
	
	error(msg) {
		var strmsg, logmsg = msg;
		if (typeof msg === 'object') { 
			strmsg = this.id_ + this.ns + JSON.stringify(msg);
			logmsg.logid = this.id_;
		}
		if (typeof msg === 'string') {
			strmsg = logmsg = this.id_ + this.ns + msg;
		}
		
        this.count++;
		if (this.loggerTransport !== "console") {
			console.log(strmsg);
		}
		if (this.loggerTransport == 'loggly') this.logger.error(msg);
		if (this.loggerTransport == 'papertrail') this.logger.error(strmsg);
    }
}

module.exports.CreateLogger = function (id, loggerTransport, credentials) {
	return new JawsLogger(id, loggerTransport, credentials);
};