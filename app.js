
/**
 * Module dependencies.
 */
require('coffee-script');

//var flash = require('connect-flash');
var express = require('express')
  , RedisStore = require('connect-redis')(express)
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({
	//store: new RedisStore,
	key: 'sid',
//	cookie: {maxAge: 60000},
	secret: "asssssssssssssssasasasaaaaaaaaljksfhahfsa",
}));
// 	secret: "asssssssssssssssasasasaaaaaaaaljksfhahfsa",
// 	store: new RedisStore
// }));
// app.use(function(req, res, next) {
// res.locals.flash = function() { return req.flash() };
// next();
// });
//app.use(flash());

app.use(require('connect-flash')());
// Expose the flash function to the view layer
// app.use(function(req, res, next) {
// 	res.locals.flash = function() { 
// 		return req.flash() 
// 	};
// 	next();
// })
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

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
