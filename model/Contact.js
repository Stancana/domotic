/**
 * Created by Tabs on 24/10/2016.
 */
var mongoose = require('mongoose');

// Define Schema
var ContactSchema = mongoose.Schema({
    email : String,
    firstName: String,
    lastName: String
}, { collection: 'contacts' });

// Create the model from schema
var Contact = mongoose.model('Contact', ContactSchema);

module.exports = {
    Contact:Contact
}
