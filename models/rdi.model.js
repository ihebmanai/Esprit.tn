var mongoose = require('mongoose');
var rdiSchema = mongoose.Schema({
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
  memebers: [
    {
      type: String,
      required: false
    }
  ]
});
var RdiModel = mongoose.model('rdi', rdiSchema);
module.exports = RdiModel;
