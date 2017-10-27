'use strict';

const express = require('express');
const router = express.Router();
const {ObjectID} = require('mongodb');
const {authenticate} = require('../middleware/authenticate');

const {Course} = require('../models/course');
const {Review} = require('../models/review');
const {User} = require('../models/user');

//get all courses
router.get('/', (req, res, next) => {
  Course.find({}, 'title').then(courses => {
    res.send({courses});
  }, err => {
    return res.status(400).send(err);
  });
});

//post new course
router.post('/', authenticate, (req, res, next) => {
  Course.create(req.body, err => {
    if (err) {
      return res.status(400).send(err);
    }

    res.location('/');
    res.status(201).send();
  });
});

//get specific course by id
router.get('/:id', (req, res, next) => {
  let id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Course.findById(id)
    .populate({
      path: 'user',
      select: 'fullName'
    })
    .populate({
      path: 'reviews',
      populate: {
        path: 'user',
        model: 'User',
        select: 'fullName'
      }
    })
    .then(course => {
      if(!course) {
        return res.status(404).send();
      }

      res.send({course});

    }, err => {
      return res.status(400).send(err);
    });
});

//update specific course by id
router.put('/:id', authenticate, (req, res, next) => {
  let id = req.params.id;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Course.findByIdAndUpdate(id, req.body, err => {
    if(err){
      return res.status(400).send(err);
    }
    res.status(204).json();
  });
});

//post a new review based on id
router.post('/:id/reviews', authenticate, (req, res, next) => {
  let courseId = req.params.id;

  if (!ObjectID.isValid(courseId)){
    return res.status(404).send();
  }

  Course.findById(courseId)
    .populate('user')
    .then(course => {

      if(!course){
        return res.status(404).send();
      }

      if(course.user._id.toString() === req.user._id.toString()){
        let err = new Error();
        err.message = "You can't review your own course";
        return res.status(400).send(err);
      }

      Review.create(req.body, err => {
        if (err) {
          return res.status(400).send(err);
        }
      }).then(review => {
        course.reviews.push(review);
        course.save()
          .then(course => {
            res.location(`/:id`); //where will this go? how do i check this?
            res.status(201).send();
          }), err => {
            if (err) {
              res.status(400).send(err);
            }
          }
        }, err => {
          if(err) {
            res.status(400).send(err);
          }
      })
    }).catch(err => {
      res.status(400).send(err);
    });

});

module.exports = router;
