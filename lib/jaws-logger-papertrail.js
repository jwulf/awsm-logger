"use strict";

var winston = require('winston'),
    Papertrail = require('winston-papertrail').Papertrail;

/* Get these credentials from Papertrail

    {
            level: 'info',
            hostname: 'hostname',
            host: 'logs3.papertrailapp.com',
            port: 134324
        }
*/

function JawsLoggerPapertrail(credentials) {
    var paperCredentials = {
        "level": credentials.level,
        "hostname": credentials.hostname,
        "host": credentials.host,
        "port": credentials.port
    };

    return new winston.Logger({
        transports: [new winston.transports.Papertrail(paperCredentials)]
    });
}

module.exports = JawsLoggerPapertrail;