"use strict";

var winston = require('winston'),
    Loggly = require('winston-loggly').Loggly;

/* Get these credentials from Papertrail
{
     inputToken: "TOKEN",
    subdomain: "SUBDOMAIN",
    tags: ["Winston-NodeJS"],
    json:true
    }
*/

function JawsLoggerLoggly(credentials) {
    return new winston.Logger({
        transports: [new winston.transports.Loggly(credentials)]
    });
}

module.exports = JawsLoggerLoggly;