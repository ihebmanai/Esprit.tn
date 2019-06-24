var mongoose = require('mongoose')

var Schema=mongoose.Schema;
var specialitySchema = mongoose.Schema({

    title:String,
    date:Date,
    description :{
        type:String,
        required:false
    },
    nombreCredit :{
        type:Number,
        required:false
    },
    formation :{
        type:String,
        enum:['Esb','Informatique','electroMecanique','continu'],
        required:false
    },
    typeCycle :{
        type:String,
        enum:['1','2','1-2'],
        required:false
    },
    annee :{
        type:String,
        enum:['1er','2eme','3eme','4eme','5eme'],
        required:false
    },
    unities:[
        {type:Schema.Types.ObjectId,ref:'unity'}
    ],

   
})
var speciality =mongoose.model('specility',specialitySchema,'specility');
module.exports=speciality;