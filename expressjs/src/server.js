var express = require('express');
const bodyParser= require('body-parser');
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient,
      Server = require('mongodb').Server

var app = express();
app.use( bodyParser.json() );
var db;

// Connection URL
const url = 'mongodb://192.168.1.1:27017';
const dbName = 'TrackMyStuff';

app.post('/_app/products', (req, res) => {
  const data = req.body;
  const productName = data.name.toLowerCase().trim();
  const collection = db.collection('Product');
  collection.find({CleanName: {$regex: "^"+productName}}).toArray(function(err, docs) {
    assert.equal(err, null);
    res.send(docs);
  })
})

app.get('/_app/stuff', (req, res) => {
  const collection = db.collection('Stuff');
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    res.send(docs);
  })
})

app.post('/_app/stuff', (req, res) => {
  const data = req.body;
  const productName = data.name;
  const cleanProductName = data.name.toLowerCase().trim();
  const productColl = db.collection('Product');
  productColl.findOne({Name: productName, CleanName: cleanProductName}, (err, result) => {
    assert.equal(err, null);
    if (!result) {
     productColl.insertOne({Name : productName, Barcode: data.barcode, CleanName: cleanProductName}, function(err, result) { });
    }
    /* Insert stuff now */
    const collection = db.collection('Stuff');
    collection.insertOne({Name : data.name, Expires: data.expires}, function(err, result) {
       assert.equal(null, err);
       res.send({status: "OK"})
     });
  })
  
  
})

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  db = client.db(dbName);

//  client.close();
  app.listen(5000);
});
