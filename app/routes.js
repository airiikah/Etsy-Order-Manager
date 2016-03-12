module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	var mongoose = require('mongoose');
	var Entry = mongoose.model('Entry');

	// entries =================================================================

	// app.get('/entries', function(req, res, next) {
	//   Entry.find(function(err, entries){
	//     if(err){ return next(err); }

	//     res.json(entries);
	//   });
	// });

	// app.get('/entries/:entry', function(req, res, next) {
	//   res.json(req.entry);
	// });

	// app.post('/entries', function(req, res, next) {
	//   var entry = new Entry(req.body);

	//   entry.save(function(err, entry){
	//     if(err){ return next(err); }

	//     res.json(entry);
	//   });
	// });

	// // helpers =================================================================
	// app.param('entry', function(req, res, next, id) {
	//   var query = Entry.findById(id);

	//   query.exec(function (err, entry){
	//     if (err) { return next(err); }
	//     if (!entry) { return next(new Error('can\'t find entry')); }

	//     req.entry = entry;
	//     return next();
	//   });
	// });

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};