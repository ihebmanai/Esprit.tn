const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const passport = require('passport');
// import models
const {UserModel} = require('../models');


// get all users
router.get('/', passport.authenticate('jwt', { session: false }),(req, res) => {
  UserModel.find((err, users) => {
    if (err) console.log(err);
    return res.json(users);
  });
});

// @route   GET api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {

  const { username, password, email} = req.body;
  UserModel.findOne({ username }).then(user => {
    if (user) {
      return res.status(400).json('username exists');
    }
    const avatar = gravatar.url(email, {s: '100', r: 'x', d: 'retro'}, false);
    const newUser = new UserModel({
      username,
      email,
      avatar,
      password,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        console.log(newUser);
        newUser
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      });
    });
  });
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  let { username, password } = req.body;
  // Find user by username
  UserModel.findOne({ username }).then(user => {
    // Check for user
    if (!user) {
      return res.status(404).json('user not found');
    }
    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const { id, username, email, avatar, createdAt, smartHubId, walletAddress } = user;
        const payload = { id, username, email, avatar, createdAt, smartHubId, walletAddress }; // Create JWT Payload
        // Sign Token
        jwt.sign(payload, process.env.TOKEN_KEY, { expiresIn: "20 days" }, (err, token) => {
         return res.json({
            success: true,
            token,
          });
        });
      } else {
        return res.status(400).json('Password incorrect');
      }
    });
  });
});

// get user by id
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  UserModel.findById(req.params.id, (err, user) => {
    if (err) console.log(err);
    return res.json(user);
  });
});

// update user
router.post('/update/:id', (req, res) => {
  var { email, password } = req.body;
  UserModel.findById(req.params.id, function(err, doc) {
    if (err) 
      console.log(err);
    doc.email = email;
    doc.avatar = gravatar.url(email, {s: '100', r: 'x', d: 'retro'}, false);
    doc.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    doc.save((err, doc) => {
      if (err) res.send(err);
      else {
        const {id, username , email, avatar, createdAt } = doc;
        res.send({id, username , email, avatar, createdAt});}
    });
  });
});

module.exports = router;
