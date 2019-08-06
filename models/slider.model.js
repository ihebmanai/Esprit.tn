var mongoose = require('mongoose')
const sliderStatus = require('../enums/slider.status');
var SliderSchema = mongoose.Schema({

    title:String,
    date:Date,
    status :{
        type:String,
        enum:sliderStatus,
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
var Slider =mongoose.model('Slider',SliderSchema);
module.exports=Slider;