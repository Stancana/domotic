/**
 * Created by Tabs on 26/10/2016.
 */

var mongoose = require('mongoose');

// Define Schema
var articleSchema = mongoose.Schema({
    title : String,
    date : Date,
    content : String
}, { collection : 'article' });

// Create the model from schema
var Article = mongoose.model('article', articleSchema);

module.exports = {
    Article:Article
}