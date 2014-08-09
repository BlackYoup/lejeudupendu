var express = require('express'),
	expressSession = require('express-session'),
	bodyParser = require('body-parser'),
	http = require('http'),
	path = require('path');

var app = express();

app.set('port', 8080);
app.set('views', path.join(__dirname, 'views/'));

if(app.get('env') !== 'development'){
	var errorHandler = require('errorhandler'),
		morgan = require('morgan');

	app.use(errorHandler);
	app.use(morgan(':method :url :status :response-tile ms - :res[content-length]'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressSession({ secret: 'yoloswag', saveUninitialized: true, resave: true }));
app.use(express.static(path.join(__dirname, 'public/')));

require('./routes/router')(app);

var server = http.createServer(app).listen(app.get('port'), function(){
	console.log('server ready');
});