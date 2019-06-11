var express = require("express");
var app = express();

app.get("/",(req,res)=>{
    res.send("Hello")
})

app.get("/camp", (req,res) =>{
    res.send("This is camp page")
})
app.listen(3000,function(){
    console.log("Yelpcamp has started!!")
});