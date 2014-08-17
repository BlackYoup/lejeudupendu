var _ = require('underscore');

module.exports = function(){
    var self = this;

    this.words = null;
    this.levels = {
	'1': {
	    params: {
		min: 0,
		max: 19
	    },
	    words: []
	},
	'2': {
	    params: {
		min: 20,
		max: 39
	    },
	    words: []
	},
	'3': {
	    params: {
		min: 40,
		max: 60
	    },
	    words: []
	}
    };
    
    this.makeLevels = function(){
	_.each(this.levels, function(obj, key){
	    self.levels[key].words = _.filter(self.words, function(word){
		var score = parseInt(word.score);
		return score <= obj.params.max && score >= obj.params.min;
	    });
	});
    };

    this.getWord = function(body){
	var ret = {word: null};
	if(body.mode === 'educatif'){
	    var level = body.level || _.random(1, _.size(this.levels));

	    if (level < 1 || level > _.size(this.levels)){
		level = _.random(1, _.size(this.levels));
	    }
	    ret.word = this.getRandomWord(level).mot;
	} else if(body.mode === 'fiesta'){
	    var level = _.random(1, _.size(this.levels));
	    ret.word = this.getRandomWord(level).mot;
	}

	return ret;
    };

    this.getRandomWord = function(index){
	return this.levels[index].words[_.random(0, (this.levels[index].words.length - 1))];
    }

    this.init = function(words){
	this.words = words;
	this.makeLevels();
	return this;
    };
};
