var mongoose = require('mongoose')

var Schema=mongoose.Schema;
var infraSchema = mongoose.Schema({

    title:String,
    date:Date,
    description :{
        type:String,
        required:false
    },
    type :{
        type:String,
        enum:['sportif','autres'],
        required:false
    },
    image :{
        type:String,
        required:false
    }
})
var infra =mongoose.model('infra',infraSchema,'infra');
module.exports=infra;