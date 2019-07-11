const mongoose = require('mongoose');
const eventTypes = require('../enums/event.types');

const Schema = mongoose.Schema;

const eventSchema = mongoose.Schema(
  {
    title: String,
    dateStart: Date,
    dateEnd: Date,
    description: String,
    archive: {
      type: Boolean,
      required: false
    },
    type: {
      type: String,
      enum: eventTypes
    },
    url: String,
    image: String,
    user: { type: Schema.Types.ObjectId, ref: 'users' }
  },
  {
    timestamps: true
  }
);
const event = mongoose.model('event', eventSchema);

module.exports = event;
