var express = require('express');
var router = express.Router();

var tarif = require('../models/tarifs')

/* GET users listing. */

router.get('/', function(req, res, next) {
  var users = null ; 
  tarif.find().sort('-date')
      .then((data)=>{
         // res.setHeader("Access-Control-Allow-Origin", "*"),
         // res.statusCode=200,
          //res.contentType('application/json'),
          res.json(data)
      })    
});

router.post('/add',function(req,res){

  var now = new Date()
  m  = new tarif({
    titreFormation : req.body.titreFormation,
    date : now,
    anneeInscription : req.body.anneeInscription,
    tva : req.body.tva,
    nationalite : req.body.nationalite,
    frais:req.body.frais,
    montant:req.body.montant,
    premiereTranche:req.body.premiereTranche,
    deuxiemeTranche:req.body.deuxiemeTranche
   

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
tarif.findByIdAndUpdate(req.params.id, {$set: req.body},
  
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
  tarif.remove(query,(err)=>{
      if(err) {
          console.log('error supression');
          return;
      } 
      else{
        res.send('tarif deleted.');
      }
  });

});

router.get('/id/:id',function(req,res){

  var now = new Date()
  let query = {
    "_id" : req.params.id
}
console.log('id'+req.params.id)
tarif.findById(req.params.id,
  
  function (err, meetings) {
    if (err) return res.send(err)
    res.send(meetings);
});

})


router.get('/jour', function(req, res, next) {
  var users = null ;
  var now = new Date() 
  tarif.find()
      .then((data)=>{
         // res.setHeader("Access-Control-Allow-Origin", "*"),
         // res.statusCode=200,
          //res.contentType('application/json'),
         // res.json(data)
         let sports = [] 
         data.forEach(element => {
           if(element.titreFormation==='jour'){
                sports.push(element)
           }
         });
         res.json(sports)
      })
      
      
  });

  
router.get('/soir', function(req, res, next) {
  var users = null ;
  var now = new Date() 
  tarif.find()
      .then((data)=>{
         // res.setHeader("Access-Control-Allow-Origin", "*"),
         // res.statusCode=200,
          //res.contentType('application/json'),
         // res.json(data)
         let sports = [] 
         data.forEach(element => {
           if(element.titreFormation==='cours_du_soir'){
                sports.push(element)
           }
         });
         res.json(sports)
      })
      
      
  });

  
router.get('/prepa', function(req, res, next) {
  var users = null ;
  var now = new Date() 
  tarif.find()
      .then((data)=>{
         // res.setHeader("Access-Control-Allow-Origin", "*"),
         // res.statusCode=200,
          //res.contentType('application/json'),
         // res.json(data)
         let sports = [] 
         data.forEach(element => {
           if(element.titreFormation==='prepa'){
                sports.push(element)
           }
         });
         res.json(sports)
      })
      
      
  });

  
router.get('/mba', function(req, res, next) {
  var users = null ;
  var now = new Date() 
  tarif.find()
      .then((data)=>{
         // res.setHeader("Access-Control-Allow-Origin", "*"),
         // res.statusCode=200,
          //res.contentType('application/json'),
         // res.json(data)
         let sports = [] 
         data.forEach(element => {
           if(element.titreFormation==='MBA'){
                sports.push(element)
           }
         });
         res.json(sports)
      })
      
      
  });



module.exports = router;