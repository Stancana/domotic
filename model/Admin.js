/**
 * Created by Tabs on 24/10/2016.
 */

//Manage connection
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/fablab');
var db = mongoose.connection;
db.on('error', function () {
    console.log('Connection to dabatase FAILED');
});
db.on('open', function () {
    console.log('Connection to dabatase SUCCESS.')
});

// Define Schema
var adminSchema = mongoose.Schema({
    firstName : String,
    lastName : String,
    email : String,
    password : String
});

// Create the model from schema
var Admin = mongoose.model('Admin', adminSchema);

module.exports = {
    Admin:Admin
}
