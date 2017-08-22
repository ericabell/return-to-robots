const express = require('express');
// const data = require('../models/users');
let data = {};
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// collection name is robots
let url = 'mongodb://localhost:27017/test';

let findUsers = function(callback) {
  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    let collection = db.collection('robots');
    collection.find({}).toArray( (err, docs) => {
      assert.equal(err, null);
      console.log(`Found user records`);
      callback(docs);
    });
  });
}

let findEmployedUsers = function(callback) {
  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    let collection = db.collection('robots');
    collection.find({job: {$ne: null}}).toArray( (err, docs) => {
      assert.equal(err, null);
      console.log(`Found user records`);
      callback(docs);
    });
  });
}

let findUnEmployedUsers = function(callback) {
  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    let collection = db.collection('robots');
    collection.find({job: {$eq: null}}).toArray( (err, docs) => {
      assert.equal(err, null);
      console.log(`Found user records`);
      callback(docs);
    });
  });
}

let findEmployeesByCountry = function(country, callback) {
  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    let collection = db.collection('robots');
    collection.find({"address.country": {$eq: country}}).toArray( (err, docs) => {
      assert.equal(err, null);
      console.log(`Found user records`);
      callback(docs);
    });
  });
}


let router = express.Router();

router.get('/', (req, res) => {
  findUsers( (docs) => {
    data.users = docs;
    res.render('directory', data);
  });
});

router.get('/employed', (req, res) => {
  findEmployedUsers( (docs) => {
    data.users = docs;
    res.render('directory', data);
  })
});

router.get('/unemployed', (req, res) => {
  findUnEmployedUsers( (docs) => {
    data.users = docs;
    res.render('directory', data);
  })
});

router.get('/country/:name', (req, res) => {
  console.log(`Country search: ${req.params.name}`);
  let country = req.params.name
  findEmployeesByCountry( country, (docs) => {
    data.users = docs;
    res.render('directory', data);
  })
})



module.exports = router;
