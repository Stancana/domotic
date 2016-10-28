/**
 * Created by Tabs on 24/10/2016.
 */
var mongoose = require('mongoose');

// Define Schema
var adminSchema = mongoose.Schema({
    firstName : String,
    lastName : String,
    email : String,
    password : String
}, { collection: 'admins' });

// Create the model from schema
var Admin = mongoose.model('Admin', adminSchema);

module.exports = {
    Admin:Admin
}
