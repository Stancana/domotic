/**
 * Created by Tabs on 22/10/2016.
 */
var express = require('express');
var router = express.Router();
var passport = require("passport");
var logged = require("../engine/checkLogged")
var Message = require('../model/Message').Message;
var Contact = require("../model/Contact").Contact;

router.use(function(req, res, next){
    if(req.originalUrl == "/admin/login") {
        next();
    }
    else{
        if (!logged.isLogged(req))
            res.redirect("/admin/login");
        else {
            res.locals.isAuthenticated = true;
            next();
        }
    }
});

router.get("/",function (req, res, next) {
    res.redirect("/admin/home");
})

router.get("/login", function(req, res, next) {
    if(logged.isLogged(req))
        res.redirect('home');
    else
        res.render('login', {message : req.flash('loginMessage')});
});

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/admin/login');
        }
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }
            return res.redirect('/admin/home');
        });
    })(req, res, next);
});

router.get('/logout', function(req, res){
    req.session = null;
    res.redirect('/');
});


router.get("/home", function(req, res, next) {
    var render_options = {
        isAuthenticated: res.locals.isAuthenticated
    };

    res.render('admin_home', render_options);
});

router.get("/message", function (req, res, next) {
    var render_options = {
        title : "Message de notification",
        isAuthenticated : res.locals.isAuthenticated
    };

    // Get current message
    Message.find({}, function (err, message) {
        if (err){
            console.log(err);
            render_options.error = err;
        }

        if(message.length > 0){
            render_options.adminMessage = message[0];
            render_options.success = req.flash('success');
        }

        res.render('message', render_options);
    });
});

router.post("/message", function (req, res, next) {
    // Get information;
    var _message = req.body.content;
    var dd = new Date();

    // Create the message to save
    var message = new Message({
        message: _message,
        date: dd
    });

    //Save message
    message.save(function (err) {
        if (err) {
            console.log(err);
            req.flash('error', 'Une erreur est survenue. Le message n\' a pu être sauvegardé !');
            res.redirect('message');
        }
        else {
            req.flash('success', 'Le message a été sauvegardé avec succès !');
            res.redirect('message');
        }
    });
});

router.get("/contacts_list", function(req, res, next) {

    var render_options = {
        isAuthenticated : res.locals.isAuthenticated
    };

    Contact.find({},function(err,docs){
        render_options.peoples = docs;
        render_options.add_error = req.flash("add_error");
        render_options.add_success = req.flash("add_success");


        res.render('contacts_list', render_options);
    });
});

router.post("/contacts_list/delete", function(req, res, next) {
    var response;

    Contact.remove({_id:""+req.body.people_id}, function(err){
        if(err){
            res.send({
                "type":"error",
                "message":"There was a problem while removing the contact"
            });
        }else{
            res.send({
                "type":"success",
                "message":"The people has been successfully removed"
            });
        }
    });
});

router.post("/contacts_list/add", function(req, res, next) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;

    //Check params

    //Insert new doc
    var new_contact = new Contact({
        firstName:firstName,
        lastName:lastName,
        email:email
    }).save(function (err) {
        if(err){
            req.flash("add_error","Il y a eu un problème lors de l'ajout du contact");
        }else{
            req.flash("add_success","Le contact a été ajouté avec succès");
        }
        res.redirect('/admin/contacts_list')
    });
});

module.exports = router;