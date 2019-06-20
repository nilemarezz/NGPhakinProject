var express = require("express");
var router = express.Router({mergeParams:true});
var listmenu = require("../models/listmenu");

//Show all items
router.get("/show", (req,res) =>{
    console.log(req.user);
    listmenu.find({},function(err,listmenu){
        if(err){
            console.log(err)
        }else{
            console.log(listmenu)
            res.render("showitems.ejs",{list : listmenu, CurrentUser: req.user})
        }
    })
    
})

//show detail of that item
router.get("/show/:id", (req,res) =>{
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
router.get("/addform", (req,res) =>{
    
    res.render("Addlist.ejs")
})
// Add to DB
router.post("/add",(req,res)=>{
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


module.exports = router;