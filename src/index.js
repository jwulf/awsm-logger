var Logger = require('./jaws-logger.js');

function logger(id, credentials) {
        var logTransport = process.env.JAWS_LOG_TRANSPORT || 'papertrail',
            stage = process.env.JAWS_STAGE || '';
            
        stage = stage && ' ['+stage+'] ';
        
        credentials = credentials || {};
        credentials.level = credentials.level || process.env.JAWS_LOG_LEVEL;
        credentials.hostname = credentials.hostname || process.env.JAWS_LOG_PAPERTRAIL_HOSTNAME + stage;
        credentials.host = credentials.host || process.env.JAWS_LOG_PAPERTRAIL_HOST;
        credentials.port = credentials.port || process.env.JAWS_LOG_PAPERTRAIL_PORT;
        credentials.name = credentials.name || process.env.JAWS_LOG_LOGGLY_NAME + stage;
        credentials.token = credentials.token || process.env.JAWS_LOG_LOGGLY_TOKEN;
        credentials.subdomain = credentials.subdomain || process.env.JAWS_LOG_LOGGLY_SUBDOMAIN;
                
        console.log(credentials);
        return Logger.CreateLogger(id, logTransport, credentials)
}

module.exports = function(id, credentials){
        return logger(id, credentials);
}

