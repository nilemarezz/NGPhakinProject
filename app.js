var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");
mongoose.connect("mongodb://localhost/ngPhakin",{ useNewUrlParser: true });

var Pattern = new mongoose.Schema({
    name:String,
    pic:String,
    description : String
})
var listmenu = mongoose.model("listmenu",Pattern);


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

    
    listmenu.findById(req.params.id,function(err,listdetail){
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

app.listen(3000,function(){
    console.log("NGPhakin has started!!")
});