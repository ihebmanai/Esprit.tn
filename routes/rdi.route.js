var express = require('express');
var router = express.Router();
const passport = require('passport');
const { upload } = require('../utils/Uploader');
var { RdiModel } = require('../models/index');

/* GET All Rdi . 
@Route : rdi/
*/
router.get('/', function(req, res, next) {
  RdiModel.find()
    .sort('-date')
    .then(data => {
      res.json(data);
    });
});

/* GET add Rdi . 
@Route : rdi/add
*/
router.post(
  '/add',
  upload.single('image'),
  passport.authenticate('jwt', { session: false }),
  function(req, res) {
    newRdi = new RdiModel({
      title: req.body.title,
      date: new Date(),
      memebers: req.body.memebers,
      desciption: req.body.desciption,
      url: req.body.url,
      image: req.file.path
    });
    newRdi.save(function(err, result) {
      if (err) res.send(err);
      else res.send(result);
    });
  }
);

/* UPDATE Rdi by Id . 
@Route : rdi/update/:id
*/
router.put(
  '/update/:id',
  upload.single('image'),
  passport.authenticate('jwt', { session: false }),
  function(req, res) {
    if (req.file) {
      RdiModel.findOneAndUpdate(
        req.params.id,
        {
          $set: {
            title: req.body.title,
            date: new Date(),
            memebers: req.body.memebers,
            desciption: req.body.desciption,
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
      RdiModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            title: req.body.title,
            date: new Date(),
            memebers: req.body.memebers,
            desciption: req.body.desciption,
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

/* DELETE Rdi by Id . 
@Route : rdi/delete/:id
*/
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), function(
  req,
  res,
  next
) {
  let query = {
    _id: req.params.id
  };
  RdiModel.remove(query, err => {
    if (err) {
      res.status(500).json(err);
      return;
    } else {
      res.status(204).send('Rdi deleted');
    }
  });
});

/* GET Rdi by Id . 
@Route : rdi/id/:id
*/
router.get('/id/:id', function(req, res) {
  let query = {
    _id: req.params.id
  };
  RdiModel.findById(query, function(err, Rdi) {
    if (err) return res.send(err);
    res.send(Rdi);
  });
});

/* Search Rdi by title . 
@Route : rdi/search
*/
router.get('/search', function(req, res) {
  var title = req.query.title;
  RdiModel.find({ title: new RegExp(title, 'i') })
    .sort('-date')
    .then(data => {
      res.json(data);
    });
});

module.exports = router;
