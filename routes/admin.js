/**
 * Created by Tabs on 22/10/2016.
 */
var express = require('express');
var router = express.Router();
var passport = require("passport");
var logged = require("../engine/checkLogged")
var Message = require('../model/Message').Message;
var Contact = require("../model/Contact").Contact;
var Scheduled = require("../model/Scheduled").Scheduled;
var Article = require("../model/Article").Article;

router.use(function(req, res, next){
    if(req.originalUrl == "/admin/login") {
        next();
    }
    else{
        if (!logged.isLogged(req)){
            res.redirect("/admin/login");
        }
        else{
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
            req.app.locals.isAuthenticated = true;
            return res.redirect('/admin/home');
        });
    })(req, res, next);
});

router.get('/logout', function(req, res){
    req.session = null;
    req.app.locals.isAuthenticated = false;
    res.redirect('/');
});


router.get("/home", function(req, res, next) {
    res.render('admin_home');
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

    var render_options = {};

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

router.get("/scheduled", function(req, res, next) {

    var render_options = {};
    Scheduled.find({}, function (err, scheduled) {
        render_options.scheduled = scheduled;
        res.render('scheduled', render_options);
    });
});

router.post("/scheduled", function(req, res, next) {
    // Get information;
    var _scheduled = req.body.content;


    var scheduled = [];

    // Create the scheduled to update
    scheduled[0] = new Scheduled({
        day : "Lundi",
        open : true,
        opening_morning : req.body.opening_morning_1_Lundi+":"+req.body.opening_morning_2_Lundi,
        closing_morning : req.body.closing_morning_1_Lundi+":"+req.body.closing_morning_2_Lundi,
        opening_afternoon : req.body.opening_afternoon_1_Lundi+":"+req.body.opening_afternoon_2_Lundi,
        closing_afternoon : req.body.closing_afternoon_1_Lundi+":"+req.body.closing_afternoon_2_Lundi
    });

    // Create the scheduled to update
    scheduled[1] = new Scheduled({
        day : "Mardi",
        open : true,
        opening_morning : req.body.opening_morning_1_Mardi+":"+req.body.opening_morning_2_Mardi,
        closing_morning : req.body.closing_morning_1_Mardi+":"+req.body.closing_morning_2_Mardi,
        opening_afternoon : req.body.opening_afternoon_1_Mardi+":"+req.body.opening_afternoon_2_Mardi,
        closing_afternoon : req.body.closing_afternoon_1_Mardi+":"+req.body.closing_afternoon_2_Mardi
    });

    for(var day in scheduled)
    {
        day.save(function (err) {
            if (err) {
                console.log(err);
                req.flash('error', 'Une erreur est survenue. L\'horaire n\'a pu être mis à jour !');
                res.redirect('scheduled');
            }
            else {
                req.flash('success', 'L\'horaire a été mis à jour avec succès !');
                res.redirect('scheduled');
            }
        });

    }
});

router.get("/articles", function (req, res, next) {

    var render_options = {}
    Article.find({},function(err,docs){
        render_options.articles = docs;
        render_options.add_error = req.flash("add_error");
        render_options.add_success = req.flash("add_success");

        res.render('articles', render_options)
    });
});

router.post("/articles", function (req, res, next) {
    var title = req.body.title;
    var content = req.body.content

    if(title == "" || content == ""){
        req.flash("add_error", "Les champs Titre et Contenu ne doivent pas être vide.");
        res.redirect('/admin/articles');
    }
    else{
        var new_article = new Article({
            title: title,
            date: new Date(),
            content: content
        }).save(function (err) {
           if(err){
               req.flash("add_error", "Une erreure est survenue lors de l'ajout d'un nouvel article");
           }else{
               req.flash("add_success", "Le nouvel article a été ajouté avec succès.")
           }
           res.redirect('/admin/articles');
        });
    }
});

router.post("/articles/delete", function(req, res, next) {
    var response;

    Article.remove({_id:""+req.body.article_id}, function(err){
        if(err){
            res.send({
                "type":"error",
                "message":"Oups ! Un problème a eu lieu. L'article n'a pas été supprimé"
            });
            req.flash("add_error","Oups ! Un problème a eu lieu. L'article n'a pas été supprimé");
        }else{
            res.send({
                "type":"success",
                "message":"L'article a été supprimer avec succès"
            });
        }
    });
});

module.exports = router;