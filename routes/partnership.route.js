var express = require('express');
var router = express.Router();
const passport = require('passport');
const { upload } = require('../utils/Uploader');
var { PartnershipModel } = require('../models/index');

/* GET All Partnership . 
@Route : Partnership/
*/
router.get('/', function(req, res, next) {
  PartnershipModel.find()
    .sort('-date')
    .then(data => {
      res.json(data);
    });
});

/* GET add Partnership . 
@Route : Partnership/add
*/
router.post(
  '/add',
  upload.single('image'),
  passport.authenticate('jwt', { session: false }),
  function(req, res) {
    newPartnership = new PartnershipModel({
      title: req.body.title,
      date: new Date(),
      type: req.body.type,
      desciption: req.body.desciption,
      url: req.body.url,
      image: req.file.path
    });
    newPartnership.save(function(err, result) {
      if (err) res.send(err);
      else res.send(result);
    });
  }
);

/* UPDATE Partnership by Id . 
@Route : Partnership/update/:id
*/
router.put(
  '/update/:id',
  upload.single('image'),
  passport.authenticate('jwt', { session: false }),
  function(req, res) {
    if (req.file) {
      PartnershipModel.findOneAndUpdate(
        req.params.id,
        {
          $set: {
            title: req.body.title,
            date: new Date(),
            type: req.body.type,
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
      PartnershipModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            title: req.body.title,
            date: new Date(),
            type: req.body.type,
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

/* DELETE Partnership by Id . 
@Route : Partnership/delete/:id
*/
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), function(
  req,
  res,
  next
) {
  let query = {
    _id: req.params.id
  };
  PartnershipModel.remove(query, err => {
    if (err) {
      res.status(500).json(err);
      return;
    } else {
      res.status(204).send('Partnership deleted');
    }
  });
});

/* GET Partnership by Id . 
@Route : Partnership/id/:id
*/
router.get('/id/:id', function(req, res) {
  let query = {
    _id: req.params.id
  };
  PartnershipModel.findById(query, function(err, Partnership) {
    if (err) return res.send(err);
    res.send(Partnership);
  });
});

/* Get Partnership by type . 
@Route : Partnership/type
*/
router.get('/type', function(req, res) {
  var type = req.query.type;
  PartnershipModel.find({ type: type })
    .sort('-date')
    .then(data => {
      res.json(data);
    });
});

/* Search Partnership by title . 
@Route : Partnership/search
*/
router.get('/search', function(req, res) {
  var title = req.query.title;
  PartnershipModel.find({ title: new RegExp(title, 'i') })
    .sort('-date')
    .then(data => {
      res.json(data);
    });
});

module.exports = router;
