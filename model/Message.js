/**
 * Created by Tabs on 26/10/2016.
 */

var mongoose = require('mongoose');

// Define Schema
var messageSchema = mongoose.Schema({
    message : String,
    date : Date,
}, { collection : 'message' });

// Pre-action
messageSchema.pre("save", function (next) {
    Message.find({}, function(err, message){
        if(err){
            console.log(err);
            next(err);
        }
        if(message.length > 0){
            Message.remove({}, function (err) {
                if(err){
                    console.log(err);
                    next(err);
                }
                next()
            });
        }
        else
            next();
    });
})

// Create the model from schema
var Message = mongoose.model('message', messageSchema);

module.exports = {
    Message:Message
}