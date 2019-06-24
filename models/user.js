var mongoose = require('mongoose')

var Schema=mongoose.Schema;
var userSchema = mongoose.Schema({

    username:String,
    date:Date,
    password :{
        type:String,
        required:false
    }
})
var user =mongoose.model('user',userSchema,'user');
module.exports=user;