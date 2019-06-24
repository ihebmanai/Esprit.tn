var mongoose = require('mongoose')

var Schema=mongoose.Schema;
var actualiteSchema = mongoose.Schema({
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
    url :{
        type:String,
        required:false
    },
    image :{
        type:String,
        required:false
    }
})
var actualite =mongoose.model('actualite',actualiteSchema,'actualite');
module.exports=actualite;