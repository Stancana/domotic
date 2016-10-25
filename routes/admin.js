/**
 * Created by Tabs on 22/10/2016.
 */
var express = require('express');
var router = express.Router();
var passport = require("passport");
var logged = require("../engine/checkLogged")

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


module.exports = router;