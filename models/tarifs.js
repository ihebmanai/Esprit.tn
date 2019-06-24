var mongoose = require('mongoose')

var Schema=mongoose.Schema;
var tarifSchema = mongoose.Schema({
    titreFormation:{
        type:String,
        enum:['cours_du_jour','cours_du_soir','EspritPrepa','MBA'],
        required:false
    },
    date:Date,
    anneeInscription :{
        type:String,
        required:false
    },
    tva :{
        type:Number,
        required:false
    },
    nationalite :{
        type:String,
        enum:['international','tunisienne'],
        required:false
    },
    frais :{
        type:Number,
        required:false
    },
    montant :{
        type:Number,
        required:false
    },
    premiereTranche :{
        type:Number,
        required:false
    },
    deuxiemeTranche :{
        type:Number,
        required:false
    }
    
})
var tarif =mongoose.model('tarif',tarifSchema,'tarif');
module.exports=tarif;