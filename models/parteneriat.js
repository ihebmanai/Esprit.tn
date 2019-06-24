
var mongoose = require('mongoose')

var Schema=mongoose.Schema;
var partSchema = mongoose.Schema({
    title:String,
    date:Date,
    description :{
        type:String,
        required:false
    },
    type :{
        type:String,
        enum:['academiques','industriels','technologiques'],
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
var part =mongoose.model('part',partSchema,'part');
module.exports=part;