const mongoose = require('mongoose');

//models
const {User} = require('../models/user');
const {Review} = require('../models/review');
const {Course} = require('../models/course');

const seeder = require('mongoose-seeder');
const data = require('../data/data.json');

//use this promise library (es6 promises over bluebird or q or axios)
mongoose.Promise = global.Promise;
//choose to connect to db based on environment
mongoose.connect(process.env.MONGODB_URI, {
  useMongoClient: true
}).then(
  () => {
    console.log(`-- Connected to database --`);
    seeder.seed(data).then(function(dbData) {
        console.log('Database seeded successfully.');
    }).catch(function(err) {
        console.log(`Could not seed database`, err);
    });
  },
  err => {console.log(`-- Could not connect to database --`);}
);

module.exports = {mongoose};
