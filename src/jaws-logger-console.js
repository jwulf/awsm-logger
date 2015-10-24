"use strict";

var EventEmitter = require('events').EventEmitter;

class JawsLoggerConsole extends EventEmitter {
	constructor() {
		super();
	}
	
	info(msg){
		console.log(msg);
	}
	
	error(msg){
		console.log(msg);
	}
}

module.exports = new JawsLoggerConsole();