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

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var debug = require('debug')('Logging'),
    JawsLoggerPapertrail = require('./jaws-logger-papertrail.js'),
    JawsLoggerLoggly = require('./jaws-logger-loggly.js');

var JawsLogger = (function () {
	function JawsLogger(id, loggerTransport, credentials) {
		var _this = this;

		_classCallCheck(this, JawsLogger);

		this.count = 0;
		this.id_ = id + ' ' || 'Logger ';
		this.ns = '';
		loggerTransport = loggerTransport || "console";
		this.loggerTransport = loggerTransport;
		switch (loggerTransport) {
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

		this.logger.on('logging', function () {
			_this.count--;
			if (_this.count === 0 && _this.resolution) return _this.resolution();
		});
		var startupmsg = this.loggerTransport + ' logger started';
		this.info(startupmsg);
	}

	_createClass(JawsLogger, [{
		key: 'id',
		value: function id(loggerid) {
			this.id_ = loggerid + ' ';
			this.info('configured.');
		}
	}, {
		key: 'bindResolve',
		value: function bindResolve(resolve) {
			var _this2 = this;

			return function (data) {
				console.log(_this2.count);
				if (_this2.count == 0) return resolve(data);
				_this2.resolution = function () {
					resolve(data);
				};
			};
		}
	}, {
		key: 'bindReject',
		value: function bindReject(reject) {
			var _this3 = this;

			return function (data) {
				if (_this3.count == 0) return reject(data);
				_this3.resolution = function () {
					reject(data);
				};
			};
		}
	}, {
		key: 'namespace',
		value: function namespace(ns) {
			this.ns = ns;
		}
	}, {
		key: 'info',
		value: function info(msg) {
			var strmsg,
			    logmsg = msg;
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
	}, {
		key: 'error',
		value: function error(msg) {
			var strmsg,
			    logmsg = msg;
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
	}]);

	return JawsLogger;
})();

module.exports.CreateLogger = function (id, loggerTransport, credentials) {
	return new JawsLogger(id, loggerTransport, credentials);
};