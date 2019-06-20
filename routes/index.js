var express = require("express");
var router = express.Router();
var passport = require("passport")
var User = require("../models/user");

router.get("/",(req,res)=>{
    res.render("landing.ejs")
})

router.get("/register",function(req,res){
    res.render("register");
})

router.post("/register",function(req,res){
    var newUser = new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log(err)
            return res.redirect("/register");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/show")
        });

    })
});

router.get("/login",function(req,res){
    
    res.render("login");
})

router.post("/login",passport.authenticate("local",{
    successRedirect: "/show",
    failureRedirect:"/login"
}),function(req,res){
    console.log("user has login")
})

router.get("/logout",function(req,res){
    req.logout();
    console.log("user has logout")
    res.redirect("/show");
})

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
