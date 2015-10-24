# Logging Library for JAWS Applications

`awsm-logger` provides application debug-level logging for lambda-based applications. 

##Use Case

You have an application running in AWS Lambda, and you want to trace the execution flow across multiple lambdas in a single log view.

##Usage

1. Install the library:

```
npm install awsm-logger
```

2. Require the library in your function code, passing it a unique ID for your function. This ID appears in log messages from this function:

```
var log = require('awsm-logger')('MyLambdaFunction_1');
```

2. Log transports are configured either via environment variables, or as a JSON object. 

via JSON:

```
var logConfigPapertrail = 
 
```

via Environment variables:

```
JAWS_LOG_TRANSPORT=papertrail || loggly
JAWS_LOG_LEVEL=info
JAWS_LOG_PAPERTRAIL_HOSTNAME='PAPERTRAIL-TEST-LOGGER'
JAWS_LOG_PAPERTRAIL_HOST=logs3.papertrailapp.com
JAWS_LOG_PAPERTRAIL_PORT=22996
JAWS_LOG_LOGGLY_NAME='LOGGLY-TEST-LOGGER'
JAWS_LOG_LOGGLY_TOKEN=some-long-token-from-loggly
JAWS_LOG_LOGGLY_SUBDOMAIN=your-loggly-subdomain
```

3. Use the log:

```
log.info('Here's an informative message');
log.error('Oh-oh, something went wrong!');
```