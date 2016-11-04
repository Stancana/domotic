var nodemailer = require("nodemailer");
//var mail_config = require("../config/mail_config")
var mail_config = require('../config/mail_config');

function send_mail(req, to, content){
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport(mail_config.SMTP_SERVER);

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: '"FabLab Grenoble ?" <'+mail_config.SENDER_EMAIL+'>', // sender address
        to: to, // list of receivers
        subject: mail_config.EMAIL_SUBJECT, // Subject line
        text: content, // plaintext body
        html: "<p>"+content+"</p>" // html body
    };

    // send mail with defined transport object
    var mail_sent = true;
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            mail_sent = false;
            console.log("There was a problem : "+error);
        }else {
            console.log('Message sent: ' + info.response);
        }
    });
     return mail_sent;
}

module.exports = {
    send_mail:send_mail
}
