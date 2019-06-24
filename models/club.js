var mongoose = require('mongoose')

var Schema=mongoose.Schema;
var clubSchema = mongoose.Schema({

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
    sport :{
        type:String,
        enum:['indiv','equipe'],
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
var club =mongoose.model('club',clubSchema,'club');
module.exports=club;