const express = require('express');
// const data = require('../models/users');
let data = {};
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// collection name is robots
let url = 'mongodb://localhost:27017/test';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  findUsers(db, (docs) => {
    // assign docs to data, just like we had it before
    data.users = docs;
    console.log(data);
    db.close();
  });

});

let findUsers = function(db, callback) {
  let collection = db.collection('robots');
  collection.find({}).toArray( (err, docs) => {
    assert.equal(err, null);
    console.log(`Found user records`);
    callback(docs);
  })
}

let router = express.Router();

router.get('/', (req, res) => {
  res.render('directory', data);
});

router.get('/employed', (req, res) => {
  // get only the employed folks
  let employedUsers = data.users.filter( (user) => {
    console.log(user);
    if( user.job === null ) {
      // they are unemployed
      return false;
    }
    return true;
  });
  res.render('directory', {users: employedUsers});
})


module.exports = router;
