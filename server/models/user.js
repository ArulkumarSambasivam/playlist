// ./models/user.js

var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var myConnection = Mongoose.createConnection('localhost', 'playlist');

var UserSchema = new Schema({
    email: String,
    firstName: String,
    lastName: String,
    passwordHash: String,
},{ collection: 'user_collection' });

module.exports = myConnection.model('User', UserSchema);