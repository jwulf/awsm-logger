"use strict";

class JawsLoggerSimple {
	constructor(){
		this.id_ = '';
	}
	
	id(msg){
		this.id_ = msg + ' ';
	}
	
	info(msg){
		console.log(this.id_ + msg);
	}
	
	error(msg){
		console.log(this.id_ + msg);
	}
}

module.exports = new JawsLoggerSimple();