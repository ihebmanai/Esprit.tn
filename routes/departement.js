var express = require('express');
var router = express.Router();
let newsModel = require('../models/departement');
const {upload} = require('../utils/Uploader');

/* GET home page. */

router.get('/', (req, res, next) => {
	newsModel
		.find()
		.then((data) => {
			res.json(data);
		})
		.catch((e) => {
			console.log(e);
		});
});
router.post('/add', upload.single('image'), (req, res) => {
	console.log(req.body);
	newsModel
		.insertMany({
			departement: req.body.departement,
			date: Date.now(),
			nom: req.body.nom,
			prenom: req.body.prenom,
			image: req.file.filename,
			email: req.body.email,
			telephone: req.body.telephone
		})
		.then(() => {
			res.json('added');
		})
		.catch((e) => console.log(e));
});
router.get('/:id', (req, res) => {
	newsModel
		.findById({ _id: req.params.id })
		.then((data) => {
			res.json(data);
		})
		.catch((e) => {
			res.status(400).json(e);
		});
});
router.get('/delete/:id', (req, res) => {
	newsModel.findByIdAndRemove(req.params.id).then(() => console.log('ok'));
	res.json('ok');
});
router.put('/update/:id', upload.single('image'), (req, res) => {
	newsModel.findOne({ _id: req.params.id }, function(err, dep) {
		if (req.file) dep.image = req.file.filename;
		dep.departement = req.body.departement;
		dep.date = Date.now();
		dep.nom = req.body.nom;
		dep.prenom = req.body.prenom;
		dep.email = req.body.email;
		dep.telephone = req.body.telephone;
		dep.save().then((data) => res.json(data));
	});
});

module.exports = router;
