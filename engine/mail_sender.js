var nodemailer = require("nodemailer");
var mail_config = require('../config/mail_config');

function send_mail(req, to, content, mail_callback){
    var smtp_config = {
        service: 'Gmail',
        auth: {
            user: mail_config.SENDER_EMAIL,
            pass: mail_config.MAIL_PASSWORD
        },
        logger: true, // log to console
        debug: true, // include SMTP traffic in the logs
    };

    if(process.env.HTTP_PROXY != ""){
        console.log("We use the proxy "+process.env.HTTP_PROXY+" to connect to SMTP");
        smtp_config.proxy = process.env.HTTP_PROXY;
    }

    var transporter = nodemailer.createTransport(smtp_config);


    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: '"FabLab Grenoble" <'+mail_config.SENDER_EMAIL+'>', // sender address
        to: to, // list of receivers
        subject: mail_config.EMAIL_SUBJECT, // Subject line
        text: content, // plaintext body
        html: "<p>"+content+"</p>" // html body
    };

    // send mail with defined transport object
    var mail_sent = true;
    var finished = false;
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log("There was a problem : "+error);
            mail_callback(false);
        }else {
            console.log('Message sent: ' + info.response);
            mail_callback(true);
        }
    });

}

module.exports = {
    send_mail:send_mail
}
