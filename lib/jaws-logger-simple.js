"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var JawsLoggerSimple = (function () {
	function JawsLoggerSimple() {
		_classCallCheck(this, JawsLoggerSimple);

		this.id_ = '';
	}

	_createClass(JawsLoggerSimple, [{
		key: 'id',
		value: function id(msg) {
			this.id_ = msg + ' ';
		}
	}, {
		key: 'info',
		value: function info(msg) {
			console.log(this.id_ + msg);
		}
	}, {
		key: 'error',
		value: function error(msg) {
			console.log(this.id_ + msg);
		}
	}]);

	return JawsLoggerSimple;
})();

module.exports = new JawsLoggerSimple();