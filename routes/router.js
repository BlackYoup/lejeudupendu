var fs = require('fs'),
    words = JSON.parse(fs.readFileSync('./lib/words.json')),
    penduLib = require('../lib/pendu'),
    Pendu = new penduLib().init(words);

module.exports = function(app){
    app.get('/', function(req, res){
	res.sendFile('views/index.html', { root: './' });
    });

    app.get('/words', function(req, res){
	res.send(Pendu.getWord(req.query));
    });
};
