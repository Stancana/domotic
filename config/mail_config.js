
var SENDER_EMAIL = "fablab.notifier@gmail.com";
var MAIL_PASSWORD = "fablabgrenoble";
var SMTP_SERVER = "smtps://"+SENDER_EMAIL+":"+MAIL_PASSWORD+"@smtp.gmail.com";
var EMAIL_SUBJECT = "FabLab Doorbell notification";

var setMailConfig = function(app){
    app.set("SENDER_EMAIL", SENDER_EMAIL);
    app.set("MAIL_PASSWORD", MAIL_PASSWORD);
    app.set("SMTP_SERVER", SMTP_SERVER);
    app.set("EMAIL_SUBJECT", EMAIL_SUBJECT);
}

module.exports = {
    setMailConfig: setMailConfig
}