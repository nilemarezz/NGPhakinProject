var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var localStrategy = require("passport-local");
var listmenu = require("./models/listmenu");
var Comment = require("./models/comments");
var User = require("./models/user")
var seedDB = require("./seeds");

//--------Config-------------------

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");
mongoose.connect("mongodb://localhost/ngPhakin",{ useNewUrlParser: true });
// seedDB();
app.use(function(req,res,next){
    res.locals.CurrentUser = req.user;
    next();
})


//------------Passport----------------
app.use(require("express-session")({
    secret: "This is Secrets",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())




// -------Route ----------------

var commentRoute = require("./routes/comments");
var listRoute = require("./routes/list");
var indexRoute = require("./routes/index");

app.use(indexRoute);
app.use(commentRoute);
app.use(listRoute);

// Landing Page


app.listen(3000,function(){
    console.log("NGPhakin has started!!")
});