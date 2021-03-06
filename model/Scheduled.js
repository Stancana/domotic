/**
 * Created by Julien on 27/11/2016.
 */

var mongoose = require('mongoose');

// Define Schema
var scheduledSchema = mongoose.Schema({
    day : String,
    open : Boolean,
    opening_morning : String,
    closing_morning : String,
    opening_afternoon : String,
    closing_afternoon : String,
}, { collection : 'scheduled' });

// Pre-action
scheduledSchema.pre("save", function (next) {
    Scheduled.find({}, function(err, message){
        if(err){
            console.log(err);
            next(err);
        }
        if(message.length > 0){
            Scheduled.remove({}, function (err) {
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

scheduledSchema.methods.updateScheduled = function () {
    Scheduled.findOneAndUpdate({day:this.day}, {opening_morning: this.opening_morning, closing_morning: this.closing_morning, opening_afternoon: this.opening_afternoon, closing_afternoon: this.closing_afternoon}, {new: true}, function(err, scheduled){
        if(err){
            console.log("Something wrong when updating data!");
        }
    });
}



// Create the model from schema
var Scheduled = mongoose.model('scheduled', scheduledSchema);

module.exports = {
    Scheduled:Scheduled
}