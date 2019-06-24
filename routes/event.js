var express = require('express');
var router = express.Router();
var event = require('../models/event')

var multer = require('multer')


//upload image 

const storage = multer.diskStorage ({
  destination : function(req,file,cb) {
    cb(null,'./uploads');
  }, 
  filename(req,file,cb) {
    cb(null,new Date().toISOString().replace(/:/g, '-')+file.originalname);
  }
})

const upload = multer({storage:storage});


/* GET users listing. */
router.get('/', function(req, res, next) {
  var users = null ; 
  event.find().sort('-date')
      .then((data)=>{
         // res.setHeader("Access-Control-Allow-Origin", "*"),
         // res.statusCode=200,
          //res.contentType('application/json'),
          res.json(data)
      })    
});

router.post('/add',upload.single('eventImage'),function(req,res){

  var now = new Date()
  m  = new event({
    title : req.body.title,
    date : now,
    desciption : req.body.desciption,
    type:req.body.type,
    url : req.body.url,
    image : req.file.path,
    user:req.body.user
   
 });
 m.save(function(err,ques){
     if (err) 
         res.send(err)
     else 
         res.send(ques)
 }) 
 console.log(m)
 //console.log("reponses contenu"+ req.body.reponses)
});

router.put('/update/:id',function(req,res){

  var now = new Date()
  let query = {
    "_id" : req.params.id
}
console.log('id'+req.params.id)
event.findByIdAndUpdate(req.params.id, {$set: req.body},
  
  function (err, meetings) {
    if (err) return res.send(err)
    res.send('event udpated.');
});

})


router.delete('/delete/:id', function(req, res, next) {
  let query = {
      "_id" : req.params.id
  }
  //console.log(query)
  event.remove(query,(err)=>{
      if(err) {
          console.log('error supression');
          return;
      } 
      else{
        res.send('event deleted.');
      }
  });

});

router.get('/id/:id',function(req,res){

  var now = new Date()
  let query = {
    "_id" : req.params.id
}
console.log('id'+req.params.id)
event.findById(req.params.id,
  
  function (err, meetings) {
    if (err) return res.send(err)
    res.send(meetings);
});

})

router.get('/searsh',function(req,res){
  var title = req.query.title 
  console.log(title)
  event.find({ 'title': new RegExp(title, 'i') }).sort('-date')
  .then((data)=>{
     // res.setHeader("Access-Control-Allow-Origin", "*"),
     // res.statusCode=200,
      //res.contentType('application/json'),
      res.json(data)
  }) 

})

   
router.get('/sportif', function(req, res, next) {
  var users = null ;
  var now = new Date() 
  event.find().sort('-date')
      .then((data)=>{
         // res.setHeader("Access-Control-Allow-Origin", "*"),
         // res.statusCode=200,
          //res.contentType('application/json'),
         // res.json(data)
         let sports = [] 
         data.forEach(element => {
           if(element.type==='sportif'){
                sports.push(element)
           }
         });
         res.json(sports)
      })  
  });

  router.get('/autres', function(req, res, next) {
    var users = null ;
    var now = new Date() 
    event.find().sort('-date')
        .then((data)=>{
           // res.setHeader("Access-Control-Allow-Origin", "*"),
           // res.statusCode=200,
            //res.contentType('application/json'),
           // res.json(data)
           let sports = [] 
           data.forEach(element => {
             if(element.type==='autres'){
                  sports.push(element)
             }
           });
           res.json(sports)
        })  
    });

module.exports = router;