require('dotenv').config();

var MongoClient = require('mongodb').MongoClient, assert = require('assert');

var telegramApiToken = process.env.TELEGRAM_API_TOKEN;
var url = process.env.MONGODB_URL || 'mongodb://localhost:27017/naffiqTestBot';

MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    db.close();
});