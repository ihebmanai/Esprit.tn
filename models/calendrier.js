var mongoose = require('mongoose')
var Schema=mongoose.Schema;
var calSchema = mongoose.Schema({

    title:String,
    date:Date,
    description :{
        type:String,
        required:false
    },
    url :{
        type:String,
        required:false
    }
})
var cal =mongoose.model('calenrier',calSchema,'calenrier');
module.exports=cal;