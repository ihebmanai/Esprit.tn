var express = require('express');
var router = express.Router();

var press = require('../models/presse')


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
  press.find().sort('-date')
      .then((data)=>{
         // res.setHeader("Access-Control-Allow-Origin", "*"),
         // res.statusCode=200,
          //res.contentType('application/json'),
          res.json(data)
      })    
});


router.post('/add',upload.single('pressImage'),function(req,res){

  var now = new Date()
  m  = new press({
    title : req.body.title,
    date : now,
    desciption : req.body.desciption,
    url : req.body.url,
    type:req.body.type,
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
press.findByIdAndUpdate(req.params.id, {$set: req.body},
  
  function (err, meetings) {
    if (err) return res.send(err)
    res.send('press udpated.');
});

})


router.delete('/delete/:id', function(req, res, next) {
  let query = {
      "_id" : req.params.id
  }
  //console.log(query)
  press.remove(query,(err)=>{
      if(err) {
          console.log('error supression');
          return;
      } 
      else{
        res.send('press deleted.');
      }
  });

});


router.get('/id/:id',function(req,res){

  var now = new Date()
  let query = {
    "_id" : req.params.id
}
console.log('id'+req.params.id)
press.findById(req.params.id,
  
  function (err, meetings) {
    if (err) return res.send(err)
    res.send(meetings);
});

})


router.get('/rapport', function(req, res, next) {
  var users = null ;
  var now = new Date() 
  press.find()
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
  press.find()
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
  press.find()
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
  press.find()
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
  press.find({ 'title': new RegExp(title, 'i') }).sort('-date')
  .then((data)=>{
     // res.setHeader("Access-Control-Allow-Origin", "*"),
     // res.statusCode=200,
      //res.contentType('application/json'),
      res.json(data)
  }) 

})




module.exports = router;