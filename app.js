
/**
 * Module dependencies.
 */
require('coffee-script');

var express = require('express')
    , RedisStore = require('connect-redis')(express);

require('express-namespace');

var http   = require('http');
var path   = require('path');
var app    = module.exports = express();             
var server = http.createServer(app);

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

app.use(require('connect-assets')());

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
require('./apps/helpers')(app);

// Routes
require ('./apps/authentication/routes')(app)
require ('./apps/admin/routes')(app)
require ('./apps/sidewalk/routes')(app)

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

require('./apps/socket-io')(app, server);
