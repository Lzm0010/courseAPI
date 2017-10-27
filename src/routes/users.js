'use strict';

const express = require('express');
const router = express.Router();
const {authenticate} = require('../middleware/authenticate');
// const {ObjectID} = require('mongodb');

// const {Course} = require('../models/course');
// const {Review} = require('../models/review');
const {User} = require('../models/user');

//get current user
router.get('/', authenticate, (req, res, next) => {
  res.send(req.user);
});

//create new user
router.post('/', (req, res, next) => {
  User.create(req.body, err => {
    if(err){
      return res.status(400).send(err);
    }

    res.location('/');
    res.status(201).send();
  });
});

module.exports = router;
