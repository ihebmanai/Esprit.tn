const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "can't be blank"],
      index: true
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
    },
    password: {
      type: String,
      required: [true, "can't be blank"]
    },
    //set the avatar from avatar server || set default avatar
    avatar: {
      type: String
    },
  },
  {
    timestamps: true
  }
);
// changed collection name to users
module.exports = mongoose.model('users', UserSchema);
