var express = require("express");
var router = express.Router({mergeParams:true});
var listmenu = require("../models/listmenu");
var Comment = require("../models/comments");
var middleware = require("../middleware/index.js")
//Show all items
router.get("/show", (req,res) =>{
    console.log(req.user);
    listmenu.find({},function(err,listmenu){
        if(err){
            console.log(err)
        }else{
            console.log(listmenu)
            res.render("showitems.ejs",{list : listmenu, currentUser: req.user})
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
            res.render("showdesc.ejs",{list:listdetail, currentUser: req.user})
            
        }
    })
    
    
})
// Add form
router.get("/addform", middleware.isLoggedIn ,(req,res) =>{
    
    res.render("Addlist.ejs", {currentUser: req.user})
})
// Add to DB
router.post("/add",middleware.isLoggedIn,(req,res)=>{
    
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newitem = {
        name:req.body.name,
        pic:req.body.pic,
        description:req.body.description,
        author:author,
        price:req.body.price,
        Score:req.body.Score,
        fblink:req.body.fblink
    };
    
    listmenu.create(newitem,function(err,listmenu){
        if(err){
            console.log(err)
        }else{
            res.redirect("/show");
        }
    });
    
})

router.get("/show/:id/edit",middleware.checklistOwner,function(req,res){
    listmenu.findById(req.params.id,function(err,list){
            res.render("listEdit",{list:list, currentUser: req.user});
        })
    })

router.put("/show/:id/edit",middleware.checklistOwner,function(req,res){
    var name = req.body.name;
    var pic = req.body.pic;
    var description = req.body.description;
    var editpost = {name:name,pic:pic,description:description};
    listmenu.findByIdAndUpdate(req.params.id,editpost,function(err,list){
        if(err){
            res.redirect("/show");
        }else{
            res.redirect("/show/"+ req.params.id);
        }

    })
})

router.delete("/show/:id/delete",middleware.checklistOwner,function(req,res){
    listmenu.findByIdAndDelete(req.params.id,function(err,list){
        if(err){
            console.log(err)
        }
        Comment.deleteMany( {_id: { $in: list.comments } }, (err) => {
            if (err) {
                console.log(err);
            }
            res.redirect("/show");
        });
    })
    
})



module.exports = router;