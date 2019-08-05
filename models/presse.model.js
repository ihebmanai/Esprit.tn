const mongoose = require('mongoose');
const presseTypes = require('../enums/presse.types');
var pressSchema = mongoose.Schema(
  {
    title: String,
    description: {
      type: String,
      required: false
    },
    type: {
      type: String,
      enum: presseTypes,
      required: false
    },
    archived: {
      type: Boolean,
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
    file: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true
  }
);
var press = mongoose.model('press', pressSchema);
module.exports = press;
