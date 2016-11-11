var express = require('express');
var router = express.Router();
var logged = require("../engine/checkLogged")
var mail_sender = require('../engine/mail_sender');
var Message = require('../model/Message').Message;
var Contact = require("../model/Contact").Contact;

router.use(function(req, res, next){
    if(logged.isLogged(req)){
        res.locals.isAuthenticated = true;
    }
    next();
});

/* GET home page. */
router.get('/', function(req, res, next) {

    var title = 'Notification fablab';

    // Get current message
    Message.find({}, function (err, message) {
        var render_options = {
            title: title,
            error: req.flash('error'),
            form_error: req.flash("form_error"),
            success: req.flash('success'),
            isAuthenticated: res.locals.isAuthenticated
        }

        if (err){
            console.log(err);
            req.flash('error', err);
        }

        if(message.length > 0){
            render_options.adminMessage = message[0];
        }

        if(logged.isLogged(req)){
            render_options.isAuthenticated = true;
        }

        Contact.find({},function(err,docs){
            render_options.peoples = docs;
            res.render('index', render_options);
        });
    });
});

router.post('/', function(req, res, next) {
    //Try to send the mail
    var mail_sent;
    var form_error = false;
    if(req.body.content == "" || req.body.content == null) {
        req.flash('form_error', 'Vous devez spécifier un message avant d\'envoyer le mail');
        form_error = true;
    }

    if(req.body["emails[]"] == null){
        req.flash('form_error', 'Vous devez spécifier au moins un destinataire.');
        form_error = true;
    }

    if(!form_error){
        mail_sent = mail_sender.send_mail(req, req.body["emails[]"], req.body.content);

        //Check whether th emails has been sent or not and render the page in consequence
        if(mail_sent){
            req.flash('success', 'Le mail a été envoyé avec succès !');
        }else{
            req.flash('error', 'Il y a eu un problème lors de l\'envoi du mail. Veuillez contactez un administrateur.');
        }
    }

    res.redirect('/');
});

module.exports = router;
