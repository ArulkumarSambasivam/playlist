var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var myConnection;

function createConnection(){
 
     mongoose.connect('mongodb://localhost:27017/playlist');
     myConnection  = mongoose.connection;
    myConnection .on('error', console.error.bind(console, 'connection error:'));
    myConnection .once('open', function() {
     console.log("connected")
    });
}
module.exports = {createConnection:createConnection,myConnection :myConnection };
 
