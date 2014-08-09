module.exports = function(app){
	app.get('/index', function(req, res){
		res.sendFile('views/index.html', { root: './' });
	});
};
