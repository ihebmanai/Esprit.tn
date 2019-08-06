var express = require('express');
var router = express.Router();
const passport = require('passport');
const { upload } = require('../utils/Uploader');
var { SliderModel } = require('../models/index');

/* GET All Slider . 
@Route : Slider/
*/
router.get('/', function(req, res, next) {
  SliderModel.find({ status: 'active' })
    .sort('-date')
    .then(data => {
      res.json(data);
    });
});

/* GET All types Slider . 
@Route : Slider/all
*/
router.get('/all', passport.authenticate('jwt', { session: false }), function(req, res, next) {
  SliderModel.find()
    .sort('-date')
    .then(data => {
      res.json(data);
    });
});

/* GET add Slider . 
@Route : Slider/add
*/
router.post(
  '/add',
  upload.single('image'),
  passport.authenticate('jwt', { session: false }),
  function(req, res) {
    newSlider = new SliderModel({
      title: req.body.title,
      date: new Date(),
      status: req.body.status,
      url: req.body.url,
      image: req.file.path
    });
    newSlider.save(function(err, result) {
      if (err) res.send(err);
      else res.send(result);
    });
  }
);

/* UPDATE Slider by Id . 
@Route : Slider/update/:id
*/
router.put(
  '/update/:id',
  upload.single('image'),
  passport.authenticate('jwt', { session: false }),
  function(req, res) {
    if (req.file) {
      SliderModel.findOneAndUpdate(
        req.params.id,
        {
          $set: {
            title: req.body.title,
            date: new Date(),
            status: req.body.status,
            url: req.body.url,
            image: req.file.path
          }
        },

        function(err, newValue) {
          if (err) return res.send(err);
          res.json(newValue);
        }
      );
    } else {
      SliderModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            title: req.body.title,
            date: new Date(),
            status: req.body.status,
            url: req.body.url
          }
        },

        function(err, newValue) {
          if (err) return res.send(err);
          res.json(newValue);
        }
      );
    }
  }
);

/* DELETE Slider by Id . 
@Route : Slider/delete/:id
*/
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), function(
  req,
  res,
  next
) {
  let query = {
    _id: req.params.id
  };
  SliderModel.remove(query, err => {
    if (err) {
      res.status(500).json(err);
      return;
    } else {
      res.status(204).send('Slider deleted');
    }
  });
});

/* GET Slider by Id . 
@Route : Slider/id/:id
*/
router.get('/id/:id', passport.authenticate('jwt', { session: false }), function(req, res) {
  let query = {
    _id: req.params.id
  };
  SliderModel.findById(query, function(err, Slider) {
    if (err) return res.send(err);
    res.send(Slider);
  });
});

/* Search Slider by title . 
@Route : Slider/search
*/
router.get('/search', function(req, res) {
  var title = req.query.title;
  SliderModel.find({ status: 'active', title: new RegExp(title, 'i') })
    .sort('-date')
    .then(data => {
      res.json(data);
    });
});

/* Search all Slider by title . 
@Route : Slider/searchall
*/
router.get('/searchall', passport.authenticate('jwt', { session: false }), function(req, res) {
  var title = req.query.title;
  SliderModel.find({ title: new RegExp(title, 'i') })
    .sort('-date')
    .then(data => {
      res.json(data);
    });
});

module.exports = router;
