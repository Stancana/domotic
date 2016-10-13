
var EMAIL = "fablab.notifier@gmail.com"
var PASSWORD = "fablabgrenoble"
var SMTP_SERVER = "smtps://"+EMAIL+":"+PASSWORD+"@smtp.gmail.com"
var EMAIL_SUBJECT = "FabLab Doorbell notification"


module.exports = {
    smtp_server: SMTP_SERVER,
    mail_account_name: EMAIL,
    email_subject: EMAIL_SUBJECT
}