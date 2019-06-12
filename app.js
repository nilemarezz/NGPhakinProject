var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine","ejs");

app.get("/",(req,res)=>{
    res.render("landing.ejs")
})

app.get("/camp", (req,res) =>{
    var camplist = [
        {name:"Rustic Camping" ,pic:"https://travel.mthai.com/app/uploads/2016/11/15203147_1203807363022219_2421126105370502869_n-1-768x512-1.jpg"},
        {name:"Glamorous Camping ",pic:"https://travel.mthai.com/app/uploads/2016/11/14523212_692570844225992_7634841182784910493_n.jpg"},
        {name:"3199′ Mountain Camp",pic:"https://travel.mthai.com/app/uploads/2016/12/15078983_651748478340034_9145896130505184722_n.jpg"}
    
    ]
    res.render("traningcamp.ejs",{camplist : camplist})
})
app.listen(3000,function(){
    console.log("Yelpcamp has started!!")
});