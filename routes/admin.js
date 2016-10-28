/**
 * Created by Tabs on 22/10/2016.
 */
var express = require('express');
var router = express.Router();
var passport = require("passport");
var logged = require("../engine/checkLogged")
var Message = require('../model/Message').Message;

router.get("/login", function(req, res, next) {
    if(logged.isLogged(req))
        res.redirect('home');
    else
        res.render('login', {message : req.flash('loginMessage')});
});

router.post("/login", passport.authenticate( 'local', {
    successRedirect : "/admin/home",
    failureRedirect : "/admin/login"
}));

router.get("/home", function(req, res, next) {
    if (logged.isLogged(req))
        res.render('home');
    else
        res.redirect("login");
});

router.get("/message", function (req, res, next) {var title = 'Message de notification';

    // Check first if you can access to this page
    if (!logged.isLogged(req))
        res.redirect('login');

    // Get current message
    Message.find({}, function (err, message) {
        if (err){
            console.log(err);
            req.flash('error', err);
            res.render('message', { title: title, error : req.flash('error')});
        }
        if(message.length > 0)
            res.render('message', {title: title, adminMessage : message[0], success : req.flash('success')});
        else
            res.render('message', { title: title});
    });
});

router.post("/message", function (req, res, next) {

    // Check first if you can access to this page
    if (!logged.isLogged(req))
        res.redirect('login');

    // Get information;
    var _message = req.body.content;
    var dd = new Date();

    // Create the message to save
    var message = new Message({
        message : _message,
        date : dd
    });

    //Save message
    message.save(function(err){
        if(err){
            console.log(err);
            req.flash('error', 'Une erreur est survenue. Le message n\' a pu être sauvegardé !');
            res.redirect('message');
        }
        else{
            req.flash('success', 'Le message a été sauvegardé avec succès !');
            res.redirect('message');
        }
    });
});

module.exports = router;