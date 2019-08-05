var mongoose = require('mongoose');

var newsShemas = mongoose.Schema({
	image: {
		type: String,
		required: false
	},
	departement: {
		type: String,
		required: false
	},
	prenom: {
		type: String,
		required: false
	},
	nom: {
		type: String,
		required: false
	},
	email: {
		type: String,
		required: false
	},
	telephone: {
		type: String,
		required: false
	}
});
var news = mongoose.model('departement', newsShemas, 'departement');
module.exports = news;
