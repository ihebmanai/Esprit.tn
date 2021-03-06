var mongoose = require('mongoose');

var newsShemas = mongoose.Schema({
	title: String,
	date: Date,
	description: {
		type: String,
		required: false
	},
	url: {
		type: String,
		required: false
	},
	image: {
		type: String,
		required: false
	},
	categorie: {
		type: String,
		required: false
	}
});
var news = mongoose.model('news', newsShemas, 'news');
module.exports = news;
