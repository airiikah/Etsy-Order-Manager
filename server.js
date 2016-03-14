// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// Etsy ===================================================
var session 		= require('express-session')
var cookieParser 	= require('cookie-parser')
var url 			= require('url')
var etsyjs 			= require('etsy-js')
var async			= require('async')

require('./env');

var Promise = require("bluebird");

//instantiate client with key and secret and set callback url
var client = etsyjs.client({
  key: process.env.CLIENT_KEY,
  secret: process.env.CLIENT_SECRET,
  callbackURL: process.env.BASE_URL+'/authorise'
});

// config for etsy
app.use(cookieParser('secEtsy'));
app.use(session());

// configuration ===========================================
	
// config files
//var db = require('./config/db');

var port = process.env.PORT || 8080; // set our port
//mongoose.connect('mongodb://localhost/journal'); // connect to our mongoDB database (commented out after you enter in your own credentials)

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
//require('./app/routes')(app); // pass our application into our routes

// ETSY AUTH =============================================================
app.get('/start', function(req, res) {
  return client.requestToken(function(err, response) {
    if (err) {
      return console.log(err);
    }
    req.session.token = response.token;
    req.session.sec = response.tokenSecret;
    return res.redirect(response.loginUrl);
  });
});

app.get('/authorise', function(req, res) {
  var query, verifier;
  query = url.parse(req.url, true).query;
  verifier = query.oauth_verifier;
  console.log('verifier', verifier);
  return client.accessToken(req.session.token, req.session.sec, verifier, function(err, response) {
    req.session.token = response.token;
    req.session.sec = response.tokenSecret;
    return res.redirect('/find');
  });
});

app.get('/getReceipts', function(req, res) {
	console.log(req.session.token);
	console.log(req.session.sec);

	var getReceipts = new Promise(function(resolve, reject){

		client.auth(process.env.CONSUMER_KEY, process.env.CONSUMER_SECRET).get('/shops/'+process.env.SHOP_NAME+'/receipts/open', {limit: 100, includes: 'Transactions'}, function(err, status, body, headers) {

		    if (err) {
		      console.log(err);
		    }
		    if (body) {
		    	resolve(body.results);
		    }
	    
  		})
	});

	getReceipts.then( function(receipts){
		res.send(receipts);
	});

});

app.get('/test', function(req, res) {
	console.log(req.session.token);
	console.log(req.session.sec);

	var getReceipts = new Promise(function(resolve, reject){

		client.auth(process.env.CONSUMER_KEY, process.env.CONSUMER_SECRET).get('/shops/'+process.env.SHOP_NAME+'/receipts/open', {limit: 100, includes: 'Transactions'}, function(err, status, body, headers) {

		    if (err) {
		      console.log(err);
		    }
		    if (body) {
		    	resolve(body.results);
		    }
	    
  		})
	});

	getReceipts.then( function(receipts){
		res.send(receipts);
	});

});

// start app ===============================================
app.listen(port);	
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app
