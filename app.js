var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");

// -------Route ----------------
var list = [
    {name:"Rustic Camping" ,pic:"https://travel.mthai.com/app/uploads/2016/11/15203147_1203807363022219_2421126105370502869_n-1-768x512-1.jpg"},
    {name:"Glamorous Camping ",pic:"https://travel.mthai.com/app/uploads/2016/11/14523212_692570844225992_7634841182784910493_n.jpg"},
    {name:"3199′ Mountain Camp",pic:"https://travel.mthai.com/app/uploads/2016/12/15078983_651748478340034_9145896130505184722_n.jpg"}

]
app.get("/",(req,res)=>{
    res.render("landing.ejs")
})

app.post("/add",(req,res)=>{
    var name = req.body.name;
    var pic = req.body.pic;
    list.push({name:name,pic:pic})
    res.redirect("/show");
})

app.get("/show", (req,res) =>{
    
    res.render("showitems.ejs",{list : list})
})

app.get("/addform", (req,res) =>{
    
    res.render("Addlist.ejs")
})
app.listen(3000,function(){
    console.log("Yelpcamp has started!!")
});