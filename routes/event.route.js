const router = require('express').Router();
const eventModel = require('../models/event.model');
const passport = require('passport');
const upload = require('../utils/Uploader');

// const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './uploads');
//   },
//   filename(req, file, cb) {
//     cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
//   }
// });

// const upload = multer({ storage });

/*****************  All routes require authorization *****************/

// router.get('/search', (req, res) => {
//   const title = req.query.title;
//   eventModel
//     .find({ title: new RegExp(title, 'i') })
//     .sort('-date')
//     .then(data => {
//       res.json(data);
//     })
//     .catch(err => res.status(400).json(err));
// });

// router.get('/filter', (req, res) => {
//   const type = req.query.type;
//   eventModel
//     .find({ type })
//     .sort('-date')
//     .then(data => {
//       res.json(data);
//     })
//     .catch(err => res.status(400).json(err));
// });

/* GET All Events . 
@Route : events/
*/
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  // const archive = req.query.isArchived;

  eventModel
    .find()
    .sort('-date')
    .then(data => {
      res.json(data);
    })
    .catch(err => res.send(err));

  // else {
  //   eventModel
  //     .find({ archive })
  //     .sort('-date')
  //     .then(data => {
  //       res.json(data);
  //     })
  //     .catch(err => res.send(err));
  // }
});

/* GET Single Events . 
@Route : events/:id
*/
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const query = {
    _id: req.params.id
  };

  eventModel
    .findOne(query)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.send(err));
});

/* Add Event . 
@Route : events/add + body {}
*/

// second parameter upload.single('eventImage');
router.post(
  '/add',
  upload.single('imageData'),
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    newEvent = new eventModel({
      title: req.body.title,
      dateStart: req.body.dateStart,
      dateEnd: req.body.dateEnd,
      description: req.body.description,
      type: req.body.type,
      archived: false,
      url: req.body.url,
      image: req.file.path,
      user: req.body.user
    });

    console.log('newEvent nodejs:', newEvent);
    newEvent
      .save()
      .then(event => res.json(event))
      .catch(err => res.status(400).json(err));
  }
);

/* UPDATE Single Event. 
@Route : events/update/:id
*/
router.put(
  '/update/:id',
  upload.single('imageData'),
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const query = {
      _id: req.params.id
    };

    let eventUpdated;
    if (req.file) {
      eventUpdated = {
        title: req.body.title,
        dateStart: req.body.dateStart,
        dateEnd: req.body.dateEnd,
        description: req.body.description,
        type: req.body.type,
        archived: req.body.archived,
        url: req.body.url,
        image: req.file.path,
        user: req.body.user
      };
    } else {
      eventUpdated = {
        title: req.body.title,
        dateStart: req.body.dateStart,
        dateEnd: req.body.dateEnd,
        description: req.body.description,
        type: req.body.type,
        archive: req.body.archive,
        url: req.body.url,
        user: req.body.user
      };
    }

    eventModel
      .findOneAndUpdate(
        query,
        {
          $set: eventUpdated
        },
        { new: true }
      )
      .then(event => res.json(event))
      .catch(err => res.status(400).json(err));
  }
);

/* DELETE Single Event. 
@Route : events/delete/:id
*/
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  let query = {
    _id: req.params.id
  };
  eventModel
    .deleteOne(query)
    .then(event => res.json(event))
    .catch(err => res.status(400).json(err));
});

router.put('/archive/:id', (req, res) => {
  let query = {
    _id: req.params.id
  };
  eventModel.findOneAndUpdate(
    query,
    {
      $set: { archived: true }
    },
    { new: true }
  ).then(event => res.json(event))
  .catch(err => res.status(400).json(err));
});

router.put('/unarchive/:id', (req, res) => {
  let query = {
    _id: req.params.id
  };
  eventModel.findOneAndUpdate(
    query,
    {
      $set: { archived: false }
    },
    { new: true }
  )      .then(event => res.json(event))
  .catch(err => res.status(400).json(err));
});

// router.get('/id/:id', function(req, res) {
//   var now = new Date();
//   let query = {
//     _id: req.params.id
//   };
//   console.log('id' + req.params.id);
//   event.findById(
//     req.params.id,

//     function(err, meetings) {
//       if (err) return res.send(err);
//       res.send(meetings);
//     }
//   );
// });

// router.get('/sportif', function(req, res, next) {
//   var users = null;
//   var now = new Date();
//   event
//     .find()
//     .sort('-date')
//     .then(data => {
//       // res.setHeader("Access-Control-Allow-Origin", "*"),
//       // res.statusCode=200,
//       //res.contentType('application/json'),
//       // res.json(data)
//       let sports = [];
//       data.forEach(element => {
//         if (element.type === 'sportif') {
//           sports.push(element);
//         }
//       });
//       res.json(sports);
//     });
// });

// router.get('/autres', function(req, res, next) {
//   var users = null;
//   var now = new Date();
//   event
//     .find()
//     .sort('-date')
//     .then(data => {
//       // res.setHeader("Access-Control-Allow-Origin", "*"),
//       // res.statusCode=200,
//       //res.contentType('application/json'),
//       // res.json(data)
//       let sports = [];
//       data.forEach(element => {
//         if (element.type === 'autres') {
//           sports.push(element);
//         }
//       });
//       res.json(sports);
//     });
// });

module.exports = router;
