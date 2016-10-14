var express = require('express');
var router = express.Router();
var mail_sender = require('../engine/mail_sender');

/* GET home page. */
router.get('/', function(req, res, next) {



    res.render('index', { title: 'FabLab staff notifier' });
});

router.post('/', function(req, res, next) {
    //Try to send the mail
    var mail_sent = mail_sender.send_mail("vince.chenal@gmail.com", req.body.content)

    //Check whether th emails has been sent or not and render the page in consequence
    if(mail_sent){
        res.render('index', { title: 'FabLab staff notifier' , mail_ok: "The mail has been successfully sent"});
    }else{
        res.render('index', { title: 'FabLab staff notifier' , mail_not_ok: "There was a problem while sending the mail. Please contact an administrator)"});
    }
});

module.exports = router;
