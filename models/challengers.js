var mongoose = require('mongoose')

var Schema=mongoose.Schema;
var challengesSchema = mongoose.Schema({

    title:String,
    date:Date,
    description :{
        type:String,
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
var challenges =mongoose.model('challenges',challengesSchema,'challenges');
module.exports=challenges;