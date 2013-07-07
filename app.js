
/**
 * Module dependencies.
 */
require('coffee-script');



var express = require('express');
var RedisStore = require('connect-redis')(express);
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser("keyboard cat"));
app.use(express.session({
	store: new RedisStore,
	secret: "aaaaaaaaaaaa",
	cookie: { maxAge: 60000}

}));


app.use(function(req, res, next){
  var err = req.session.error
    , msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = '';
  if (err) res.locals.message = {error: err }
  if (msg) res.locals.message = {note: msg }
  next();
});

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
app.configure('development', function() {
	app.use(express.errorHandler());
});

app.configure('production', function() {
	app.use(express.errorHandler());
});

app.configure('test', function() {
	app.use(express.errorHandler());
	app.set('port', '3001');
});

// Helpers
//require('./apps/helpers')(app);

// Routes
require ('./apps/authentication/routes')(app)

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
