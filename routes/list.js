var express = require("express");
var router = express.Router({mergeParams:true});
var listmenu = require("../models/listmenu");
var Comment = require("../models/comments");
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
router.get("/addform", isLoggedIn ,(req,res) =>{
    
    res.render("Addlist.ejs")
})
// Add to DB
router.post("/add",isLoggedIn,(req,res)=>{
    var name = req.body.name;
    var pic = req.body.pic;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newitem = {name:name,pic:pic,description:description,author:author};
    
    listmenu.create(newitem,function(err,listmenu){
        if(err){
            console.log(err)
        }else{
            res.redirect("/show");
        }
    });
    
})

router.get("/show/:id/edit",function(req,res){
    listmenu.findById(req.params.id,function(err,list){
        if(err){
            console.log(err)
            res.redirect("/show")
        }else{
            res.render("listEdit",{list:list});
        }
    })
    
})

router.put("/show/:id/edit",function(req,res){
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

router.delete("/show/:id/delete",function(req,res){
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

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}



module.exports = router;