var mongoose = require('mongoose')
const { clubTypes, sportTypes } = require('../enums/club.types');
var clubSchema = mongoose.Schema({

    title:String,
    date:Date,
    description :{
        type:String,
        required:false
    },
    type :{
        type:String,
        enum:clubTypes,
        required:false
    },
    sport :{
        type:String,
        enum:sportTypes,
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
var club =mongoose.model('club',clubSchema);
module.exports=club;