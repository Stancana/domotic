/**
 * Created by Tabs on 22/10/2016.
 */
var express = require('express');
var router = express.Router();
var passport = require("passport");
var logged = require("../engine/checkLogged");
var Contact = require("../model/Contact").Contact;

router.get("/",function (req, res, next) {
    res.redirect("/admin/home");
})

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

router.get("/contacts_list", function(req, res, next) {
    if (logged.isLogged(req)) {

        var diffusion_list;
        Contact.find({},function(err,docs){
                res.render('contacts_list', {
                    peoples: docs,
                    add_error: req.flash("add_error"),
                    add_success: req.flash("add_success")
                });
        });
    }
    else
        res.redirect("login");
});

router.post("/contacts_list/delete", function(req, res, next) {
    if (logged.isLogged(req)) {
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
    }
    else
        res.redirect("login");
});

router.post("/contacts_list/add", function(req, res, next) {
    if (logged.isLogged(req)) {
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

    }
    else
        res.redirect("login");
});

module.exports = router;