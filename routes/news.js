var express = require('express');
var router = express.Router();
let newsModel = require('../models/news');
const upload = require('../utils/Uploader');

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
			title: req.body.title,
			date: Date.now(),
			description: req.body.description,
			image: req.file.filename,
			categorie: req.body.categorie
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
			console.log(e);
		});
});
router.get('/delete/:id', (req, res) => {
	newsModel.findByIdAndRemove(req.params.id).then((res) => console.log(res));
	res.json('ok');
});
router.put('/update/:id', upload.single('image'), (req, res) => {
	newsModel.findOne({ _id: req.params.id }, function(err, news) {
		if (req.file) doc.image = req.file.filename;
		news.title = req.body.title;
		news.date = Date.now();
		news.description = req.body.description;
		news.categorie = req.body.categorie;
		news.save().then(() => res.json('Image Updated'));
	});
});
router.get('/search/:q', (req, res) => {
	newsModel
		.find()
		.then((data) => {
			if (!req.params.q) {
				res.json(data);
			}
			news = [];
			data.map((e) => {
				if (e.title.includes(req.params.q)) news.push(e);
			});
			res.json(news);
		})
		.catch((e) => {
			console.log(e);
		});
});

module.exports = router;
