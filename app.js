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
seedDB();


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

// Landing Page
app.get("/",(req,res)=>{
    res.render("landing.ejs")
})

//Show all items
app.get("/show", (req,res) =>{
    listmenu.find({},function(err,listmenu){
        if(err){
            console.log(err)
        }else{
            console.log(listmenu)
            res.render("showitems.ejs",{list : listmenu})
        }
    })
    
})

//show detail of that item
app.get("/show/:id", (req,res) =>{
    listmenu.findById(req.params.id).populate("comments").exec(function(err,listdetail){
        if(err){
            console.log(err);
        }else{
            
            console.log(listdetail);
            res.render("showdesc.ejs",{list:listdetail})
            
        }
    })
    
    
})



// Add form
app.get("/addform", (req,res) =>{
    
    res.render("Addlist.ejs")
})


// Add to DB
app.post("/add",(req,res)=>{
    var name = req.body.name;
    var pic = req.body.pic;
    var description = req.body.description;
    var newitem = {name:name,pic:pic,description:description};
    listmenu.create(newitem,function(err,listmenu){
        if(err){
            console.log(err)
        }else{
            res.redirect("/show");
        }
    });
    
})

app.post("/comment/:id",function(req,res){
    var author = req.body.author;
    var text = req.body.text;
    var newcomment={author:author,text:text}
    listmenu.findById(req.params.id,function(err,listmenu){
        if(err){
            console.log(err)
        }else{
            Comment.create(newcomment,function(err,Comment){
                if(err){
                    console.log(err)
                }else{
                    listmenu.comments.push(Comment)
                    listmenu.save();
                    res.redirect("/show/"+req.params.id)
                }
            })
            
            
        }
    })
    

})

app.get("/register",function(req,res){
    res.render("register");
})

app.post("/register",function(req,res){
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

app.listen(3000,function(){
    console.log("NGPhakin has started!!")
});