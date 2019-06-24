var express = require('express');
var router = express.Router();


var part = require('../models/parteneriat')


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

router.get('/', function(req, res, next) {
  var users = null ; 
  part.find().sort('-date')
      .then((data)=>{
         // res.setHeader("Access-Control-Allow-Origin", "*"),
         // res.statusCode=200,
          //res.contentType('application/json'),
          res.json(data)
      })    
});


router.post('/add',upload.single('partImage'),function(req,res){

  var now = new Date()
  m  = new part({
    title : req.body.title,
    date : now,
    desciption : req.body.desciption,
    url : req.body.url,
    type:req.body.type,
    image : req.file.path,
   // user:req.body.user
   
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

// update part ne marche pas 
router.put('/update/:id',function(req,res){

  var now = new Date()
  let query = {
    "_id" : req.params.id
}
console.log('id'+req.params.id)
part.findByIdAndUpdate(req.params.id, {$set: req.body},
  
  function (err, meetings) {
    if (err) return res.send(err)
    res.send('part udpated.');
});
})


router.delete('/delete/:id', function(req, res, next) {
  let query = {
      "_id" : req.params.id
  }
  //console.log(query)
  part.remove(query,(err)=>{
      if(err) {
          console.log('error supression');
          return;
      } 
      else{
        res.send('part deleted.');
      }
  });

});


router.get('/id/:id',function(req,res){

  var now = new Date()
  let query = {
    "_id" : req.params.id
}
console.log('id'+req.params.id)
part.findById(req.params.id,
  
  function (err, meetings) {
    if (err) return res.send(err)
    res.send(meetings);
});

})


router.get('/academiques', function(req, res, next) {
  var users = null ;
  var now = new Date() 
  part.find()
      .then((data)=>{
         // res.setHeader("Access-Control-Allow-Origin", "*"),
         // res.statusCode=200,
          //res.contentType('application/json'),
         // res.json(data)
         let sports = [] 
         data.forEach(element => {
           if(element.type==='academiques'){
                sports.push(element)
           }
         });
         res.json(sports)
      })
      
      
  });

  
router.get('/industriels', function(req, res, next) {
  var users = null ;
  var now = new Date() 
  part.find()
      .then((data)=>{
         // res.setHeader("Access-Control-Allow-Origin", "*"),
         // res.statusCode=200,
          //res.contentType('application/json'),
         // res.json(data)
         let sports = [] 
         data.forEach(element => {
           if(element.type==='industriels'){
                sports.push(element)
           }
         });
         res.json(sports)
      })
      
      
  });


  
router.get('/technologiques', function(req, res, next) {
  var users = null ;
  var now = new Date() 
  part.find()
      .then((data)=>{
         // res.setHeader("Access-Control-Allow-Origin", "*"),
         // res.statusCode=200,
          //res.contentType('application/json'),
         // res.json(data)
         let sports = [] 
         data.forEach(element => {
           if(element.type==='technologiques'){
                sports.push(element)
           }
         });
         res.json(sports)
      })
      
      
  });


  
router.get('/searsh',function(req,res){
  var title = req.query.title 
  console.log(title)
  part.find({ 'title': new RegExp(title, 'i') }).sort('-date')
  .then((data)=>{
     // res.setHeader("Access-Control-Allow-Origin", "*"),
     // res.statusCode=200,
      //res.contentType('application/json'),
      res.json(data)
  }) 

})



module.exports = router;