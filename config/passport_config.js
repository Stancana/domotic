/**
 * Created by Tabs on 23/10/2016.
 */
var passportStrategy = require('passport-local').Strategy;

/*
    Configure passport
 */
function setConfiguration(passport){


    // Serialization
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    //Deserialization
    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });

    // Delete User after BDD OP : TODO Clement
    var user = {
        username : 'toto'
    }

    passport.use( new passportStrategy({
        passReqToCallback : true
    },function (req,username, password, done) {
        if(username != "toto") {
            return done(null, false);
        }
        if(password != "toto"){
            return done(null, false);
        }
        return done(null, user);
    }));
}

module.exports = {
    setConfiguration:setConfiguration
}