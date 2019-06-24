var express = require('express');
var router = express.Router();

var spec = require('../models/speciality')


/* GET users listing. */
router.get('/', function(req, res, next) {
  var users = null ; 
  spec.find().sort('-date')
      .then((data)=>{
         // res.setHeader("Access-Control-Allow-Origin", "*"),
         // res.statusCode=200,
          //res.contentType('application/json'),
          res.json(data)
      }) 
});


router.post('/add',function(req,res){

  var now = new Date()
  m  = new spec({
    title : req.body.title,
    date : now,
    desciption : req.body.desciption,
    nombreCredit : req.body.nombreCredit,
    formation : req.body.formation,
    typeCycle : req.body.typeCycle,
    annee:req.body.annee
   

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
spec.findByIdAndUpdate(req.params.id, {$set: req.body},
  
  function (err, meetings) {
    if (err) return res.send(err)
    res.send('challenges udpated.');
});
})


router.delete('/delete/:id', function(req, res, next) {
  let query = {
      "_id" : req.params.id
  }
  //console.log(query)
  spec.remove(query,(err)=>{
      if(err) {
          console.log('error supression');
          return;
      } 
      else{
        res.send('challenges deleted.');
      }
  });

});


router.get('/id/:id',function(req,res){

  var now = new Date()
  let query = {
    "_id" : req.params.id
}
console.log('id'+req.params.id)
spec.findById(req.params.id,
  
  function (err, meetings) {
    if (err) return res.send(err)
    res.send(meetings);
});
})

router.get('/searsh',function(req,res){
  var title = req.query.title 
  console.log(title)
  spec.find({ 'title': new RegExp(title, 'i') }).sort('-date')
  .then((data)=>{
     // res.setHeader("Access-Control-Allow-Origin", "*"),
     // res.statusCode=200,
      //res.contentType('application/json'),
      res.json(data)
  }); 

})

router.get('/informatique', function(req, res, next) {
  var users = null ;
  var now = new Date() 
  spec.find()
      .then((data)=>{
         // res.setHeader("Access-Control-Allow-Origin", "*"),
         // res.statusCode=200,
          //res.contentType('application/json'),
         // res.json(data)
         let sports = [] 
         data.forEach(element => {
           if(element.formation==='Informatique'){
                sports.push(element)
           }
         });
         res.json(sports)
      })
      
      
  });

  router.get('/esb', function(req, res, next) {
    var users = null ;
    var now = new Date() 
    spec.find()
        .then((data)=>{
           // res.setHeader("Access-Control-Allow-Origin", "*"),
           // res.statusCode=200,
            //res.contentType('application/json'),
           // res.json(data)
           let sports = [] 
           data.forEach(element => {
             if(element.formation==='Esb'){
                  sports.push(element)
             }
           });
           res.json(sports)
        })
        
        
    });

    
  router.get('/electro', function(req, res, next) {
    var users = null ;
    var now = new Date() 
    spec.find()
        .then((data)=>{
           // res.setHeader("Access-Control-Allow-Origin", "*"),
           // res.statusCode=200,
            //res.contentType('application/json'),
           // res.json(data)
           let sports = [] 
           data.forEach(element => {
             if(element.formation==='electroMecanique'){
                  sports.push(element)
             }
           });
           res.json(sports)
        })
        
        
    });

    router.get('/continu', function(req, res, next) {
      var users = null ;
      var now = new Date() 
      spec.find()
          .then((data)=>{
             // res.setHeader("Access-Control-Allow-Origin", "*"),
             // res.statusCode=200,
              //res.contentType('application/json'),
             // res.json(data)
             let sports = [] 
             data.forEach(element => {
               if(element.formation==='continu'){
                    sports.push(element)
               }
             });
             res.json(sports)
          })
          
          
      });
  





module.exports = router;