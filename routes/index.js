var express = require('express');
var router = express.Router();
var mail_sender = require('../engine/mail_sender');
var Message = require('../model/Message').Message;

/* GET home page. */
router.get('/', function(req, res, next) {

    var title = 'Notification fablab';

    // Get current message
    Message.find({}, function (err, message) {
        if (err){
            console.log(err);
            req.flash('error', err);
            res.render('index', { title: title, error : req.flash('error')});
        }
        if(message.length > 0)
            res.render('index', {title: title, adminMessage : message[0]});
        else
            res.render('index', { title: title});
    });
});

router.post('/', function(req, res, next) {
    //Try to send the maili
    var mail_sent;
    if(req.body.content != "" && req.body.content != null){
        mail_sender.send_mail("vince.chenal@gmail.com", req.body.content)
    }else{
        res.render('index', { title: 'FabLab staff notifier' , form_error:"Vous devez spécifier un message avant d'envoyer le mail"});
    }

    //Check whether th emails has been sent or not and render the page in consequence
    if(mail_sent){
        res.render('index', { title: 'FabLab staff notifier' , success: "The mail has been successfully sent"});
    }else{
        res.render('index', { title: 'FabLab staff notifier' , error: "There was a problem while sending the mail. Please contact an administrator)"});
    }
});

module.exports = router;
