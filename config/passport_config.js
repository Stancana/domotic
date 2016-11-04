/**
 * Created by Tabs on 23/10/2016.
 */
var passportStrategy = require('passport-local').Strategy;
var Admin = require('../model/Admin').Admin;
var passwordHash = require("password-hash");

/*
    Configure passport
 */
function setConfiguration(passport){


    // Serialization
    passport.serializeUser(function(user, done) {
        user = user.toObject();
        delete user["password"];
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
        Admin.findOne({'email' : username}, 'password firstName lastName', function (err, user) {
                if(err){
                    console.error(err);
                    return done(null, false);
                }

                // User not found
                if(user == null){
                    console.log("User %s doesn't exist.", username);
                    return done(null, false, req.flash('loginMessage', 'Oups ! L\'utilisateur n\'existe pas.'));
                }

                // User found
                else {
                    console.log("User %s found.", username);
                    if(passwordHash.verify(password, user.password)) {
                        // Success
                        return done(null, user);
                    }
                    else{
                        // Wrong password
                        console.log("Wrong password for user %s.", username);
                        return done(null, false, req.flash('loginMessage', 'Oups ! Mot de passe incorrect.'));
                    }
                }
        });
    }));
}

module.exports = {
    setConfiguration:setConfiguration
}