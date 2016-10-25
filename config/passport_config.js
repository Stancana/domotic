/**
 * Created by Tabs on 23/10/2016.
 */
var passportStrategy = require('passport-local').Strategy;
var Admin = require('../model/Admin').Admin;

/*
    Configure passport
 */
function setConfiguration(passport){


    // Serialization
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    // Deserialization
    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });

    // Identification strategy
    passport.use( new passportStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },function (req,username, password, done) {
        Admin.findOne({'email' : username, 'password' : password}, 'firstName lastName', function (err, user) {
                if(err){
                    console.error(err);
                    return done(null, false);
                }
                // User not found
                if(user == null){
                    console.log("User %s doesn't exist.", username);
                    return done(null, false, req.flash('loginMessage', 'Oups ! Your mail or login is not avalaible.'));
                }
                // User found
                else {
                    console.log("User %s found.", username);
                    return done(null, user);
                }
        });
    }));
}

module.exports = {
    setConfiguration:setConfiguration
}