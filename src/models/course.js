const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CourseSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  estimatedTime: {
    type: String
  },
  materialsNeeded: {
    type: String
  },
  steps: [{
    stepNumber: {
      type: Number
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }],
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }]
});

let Course = mongoose.model('Course', CourseSchema);

module.exports = {Course};
