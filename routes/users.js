var express = require('express');
var router = express.Router();

var user = require('../models/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(' users respond with a resource');
});

router.post('/add',function(req,res){

  var now = new Date()
  m  = new user({
    username : req.body.username,
    password : req.body.password,
   

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


module.exports = router;
