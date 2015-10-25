# Logging Library for JAWS Applications

`awsm-logger` provides application developer-level logging for lambda-based applications. 

##Use Case

You have an application running in AWS Lambda, and you want to trace the execution flow across multiple lambdas in a single log view.

##Usage

1. Install the library:

```
npm install awsm-logger
```

2. Configure a log transport, either via environment variables, or as a JSON object. 

via JSON:

```
var logConfigPapertrail = {
	"logTransport": "papertrail",
	"level": "log",
	"hostname": "MY_APPLICATION",
	"host": "logs3.papertrailapp.com",
	"port": "23934"	
}

var logConfigLoggly = {
	"logTransport": "loggly",
	"level": "log",
	"name": "MY_APPLICATION"
	"token": "some-long-token-from-loggly",
	"subdomain": ""
}
 
```

via Environment variables:

```
JAWS_LOG_TRANSPORT=papertrail 
JAWS_LOG_LEVEL=info
JAWS_LOG_PAPERTRAIL_HOSTNAME='MY_APPLICATION'
JAWS_LOG_PAPERTRAIL_HOST=logs3.papertrailapp.com
JAWS_LOG_PAPERTRAIL_PORT=22996

JAWS_LOG_TRANSPORT=loggly
JAWS_LOG_LOGGLY_NAME='MY_APPLICATION'
JAWS_LOG_LOGGLY_TOKEN=some-long-token-from-loggly
JAWS_LOG_LOGGLY_SUBDOMAIN=your-loggly-subdomain
```

3. Require the library in your function code, passing it a unique ID for your function. This ID appears in log messages from this function:

```
// Configuring via environmental variables
var log = require('awsm-logger')('MyLambdaFunction_1');

// Configuring via a JSON configuration object
var log = require('awsm-logger')('MyLambdaFunction_1', logConfigLoggly);
```

4. Specify a namespace for the log messages. This is used to trace, for example, a specific customer order through multiple lambdas. Use can use this value to trace the flow of a single event through multiple lambda functions.

```
log.namespace(event.orderNumber);
```

5. Use the log in your function:

```
log.info('Here's an informative message');
log.error('Oh-oh, something went wrong!');
```

6. Execution of a Lambda function on AWS exits when one of the `context` methods `fail`, `succeed`, or `done` is called.

```
var log = require('awsm-logger')('MyLambdaFunction_1');
	
function main_function(event, context) {
	return new Promise(function(resolve, reject) {
		resolve = log.bindResolve(resolve);
		reject = log.bindReject(reject);
		
		log.info('A log message');
		log.info('A second log message');
		
		context.succeed('done!');
		// The log messages will not be logged.
		// They are asynchronous, and context.succeed halts execution
	});		
}
```

7. To allow your logging messages to complete before the function exits, `awsm-logger` can wrap a Promise. Here's an example:

```
var log = require('awsm-logger')('MyLambdaFunction_1'),
	Promise = require('bluebird');

function entry_point(event, context) {
	main_function(event).then(function(msg){
		context.succeed(msg);
	}, function(msg){
		context.fail(msg);
	}
}
	
function main_function(event) {
	return new Promise(function(resolve, reject) {
		resolve = log.bindResolve(resolve);
		reject = log.bindReject(reject);
		
		log.info('A log message');
		log.info('A second log message');
		
		resolve('done!');
		// The log object will resolve this promise when all log messages are sent
	});		
}
```