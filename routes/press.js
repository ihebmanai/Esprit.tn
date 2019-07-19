var express = require('express');
var router = express.Router();
const passport = require('passport');
var pressModel = require('../models/presse')


var multer = require('multer')


//upload image 

/*****************  All routes require authorization *****************/




const storage = multer.diskStorage ({
  destination : function(req,file,cb) {
    cb(null,'./uploads');
  }, 
  filename(req,file,cb) {
    cb(null,new Date().toISOString().replace(/:/g, '-')+file.originalname);
  }
})

const upload = multer({storage:storage});

router.get('/search', (req, res) => {
  const title = req.query.title;
  pressModel
    .find({ title: new RegExp(title, 'i') })
    .sort('-date')
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json(err));
});
// passport.authenticate('jwt', { session: false }),
router.get('/', (req, res) => {
  var users = null ; 
  pressModel.find({archived:false}).sort('-date')
      .then((data)=>{
           // res.setHeader("Access-Control-Allow-Origin", "*"),
         // res.statusCode=200,
          //res.contentType('application/json'),
          res.json(data)
      })    
});






//passport.authenticate('jwt', { session: false }),


router.post('/add',upload.single('pressImage'),(req,res)=>
{

 
  m  = new pressModel({
    title : req.body.title,
    description : req.body.description,
    url : req.body.url,
    archived : false,
    type:req.body.type,
    image : req.file.path,
    user:req.body.user
   
 });
 m.save((err,press)=>{
     if (err) 
         res.send(err)
     else 
         res.send(press)
 }) 
 console.log(m)
 //console.log("reponses contenu"+ req.body.reponses)
});

/* UPDATE Single Event. 
@Route : events/update/:id
*/
router.put(
  '/update/:id',
  upload.single('pressImage'),
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const query = {
      _id: req.params.id
    };

    let eventUpdated;
    if (req.file) {
      eventUpdated = {
        title: req.body.title,
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
        description: req.body.description,
        archived: req.body.archived,
        type: req.body.type,
        url: req.body.url,
        user: req.body.user
      };
    }

    pressModel
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

router.put('/archive/:id', (req, res) => {
  let query = {
    _id: req.params.id
  };
  pressModel.findOneAndUpdate(
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
  pressModel.findOneAndUpdate(
    query,
    {
      $set: { archived: false }
    },
    { new: true }
  )      .then(event => res.json(event))
  .catch(err => res.status(400).json(err));
});


router.delete('/delete/:id', function(req, res, next) {
  let query = {
      "_id" : req.params.id
  }
  //console.log(query)
  pressModel.remove(query,(err)=>{
      if(err) {
          console.log('error supression');
          return;
      } 
      else{
        res.send('press deleted.');
      }
  });

});

/* GET Single PressActicle . 
@Route : press/:id
*/

router.get('/:id',function(req,res){

  
  let query = {
    "_id" : req.params.id
}
pressModel
    .findOne(query)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.send(err));

})


router.get('/rapport', function(req, res, next) {
  var users = null ;
  var now = new Date() 
  pressModel.find()
      .then((data)=>{
         // res.setHeader("Access-Control-Allow-Origin", "*"),
         // res.statusCode=200,
          //res.contentType('application/json'),
         // res.json(data)
         let sports = [] 
         data.forEach(element => {
           if(element.type==='rapport'){
                sports.push(element)
           }
         });
         res.json(sports)
      })
      
      
  });

  

router.get('/article', function(req, res, next) {
  var users = null ;
  var now = new Date() 
  pressModel.find()
      .then((data)=>{
         // res.setHeader("Access-Control-Allow-Origin", "*"),
         // res.statusCode=200,
          //res.contentType('application/json'),
         // res.json(data)
         let sports = [] 
         data.forEach(element => {
           if(element.type==='article'){
                sports.push(element)
           }
         });
         res.json(sports)
      })
      
      
  });

  
router.get('/brochures', function(req, res, next) {
  var users = null ;
  var now = new Date() 
  pressModel.find()
      .then((data)=>{
         // res.setHeader("Access-Control-Allow-Origin", "*"),
         // res.statusCode=200,
          //res.contentType('application/json'),
         // res.json(data)
         let sports = [] 
         data.forEach(element => {
           if(element.type==='brochure'){
                sports.push(element)
           }
         });
         res.json(sports)
      })
      
      
  });

  
router.get('/communique', function(req, res, next) {
  var users = null ;
  var now = new Date() 
  pressModel.find()
      .then((data)=>{
         // res.setHeader("Access-Control-Allow-Origin", "*"),
         // res.statusCode=200,
          //res.contentType('application/json'),
         // res.json(data)
         let sports = [] 
         data.forEach(element => {
           if(element.type==='communique'){
                sports.push(element)
           }
         });
         res.json(sports)
      })
      
      
  });

  
router.get('/searsh',function(req,res){
  var title = req.query.title 
  console.log(title)
  pressModel.find({ 'title': new RegExp(title, 'i') }).sort('-date')
  .then((data)=>{
     // res.setHeader("Access-Control-Allow-Origin", "*"),
     // res.statusCode=200,
      //res.contentType('application/json'),
      res.json(data)
  }) 

})




module.exports = router;