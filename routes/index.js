var express = require('express');
var router = express.Router();
var logged = require("../engine/checkLogged")
var mail_sender = require('../engine/mail_sender');
var Message = require('../model/Message').Message;
var Contact = require("../model/Contact").Contact;
var Scheduled = require("../model/Scheduled").Scheduled;
var qr = require('qr-image');

/* GET home page. */
router.get('/', function(req, res, next) {

    var title = 'Notification fablab';

    // Get current message
    Message.find({}, function (err, message) {
        var render_options = {
            title: title,
            error: req.flash('error'),
            form_error: req.flash("form_error"),
            success: req.flash('success')
        }

        if (err){
            console.log(err);
            req.flash('error', err);
        }

        if(message.length > 0){
            render_options.adminMessage = message[0];
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
        res.redirect("/");
    }

    if(req.body["emails[]"] == null){
        req.flash('form_error', 'Vous devez spécifier au moins un destinataire.');
        form_error = true;
        res.redirect("/");
    }

    var mail_callback = function(mail_sent){
        //Check whether th emails has been sent or not and render the page in consequence
        if(mail_sent){
            req.flash('success', 'Le mail a été envoyé avec succès !');
        }else{
            req.flash('error', 'Il y a eu un problème lors de l\'envoi du mail. Veuillez contactez un administrateur.');
        }

        res.redirect('/');
    }

    if(!form_error) {
        mail_sent = mail_sender.send_mail(req, req.body["emails[]"], req.body.content, mail_callback);
    }
});

router.get('/new', function(req, res, next) {
    // Get current message
    Message.find({}, function (err, message) {
        var render_options = {
            error: req.flash('error'),
            form_error: req.flash("form_error"),
            success: req.flash('success'),
            new_page: true
        }

        if (err){
            console.log(err);
            req.flash('error', err);
        }

        if(message.length > 0){
            render_options.adminMessage = message[0];
        }

        Scheduled.find({}, function (err, scheduled) {
            render_options.scheduled = scheduled;
            res.render('new', render_options);
        });
    });
});

router.get('/qr-code', function(req,res){
    var code = qr.image('http://www.google.com', { type: 'png', ec_level: 'H', size: 7, margin: 0 });
    res.setHeader('Content-type', 'image/png');
    code.pipe(res);
});

module.exports = router;
