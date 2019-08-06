var mongoose = require('mongoose');
const partnershipTypes = require('../enums/partnership.types');
var partnershipSchema = mongoose.Schema({
  title: String,
  date: Date,
  description: {
    type: String,
    required: false
  },
  url: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: false
  },
  type:
    {
      type: String,
      enum: partnershipTypes,
      required: false
    }
  
});
var PartnershipModel = mongoose.model('partnership', partnershipSchema);
module.exports = PartnershipModel;
