var express = require("express");
var router = express.Router();
var listmenu = require("../models/listmenu");
var Comment = require("../models/comments");

router.post("/comment/:id",isLoggedIn,function(req,res){
    
    var text = req.body.text;
    var author = {
        id:req.user._id,
        username:req.user.username
    }
    var newcomment={text:text,author:author}
    listmenu.findById(req.params.id,function(err,listmenu){
        if(err){
            console.log(err)
        }else{
            Comment.create(newcomment,function(err,Comments){
                if(err){
                    console.log(err)
                }else{

                    listmenu.comments.push(Comments)
                    listmenu.save();
                    res.redirect("/show/"+req.params.id)
                }
            })
            
            
        }
    })
    

})

router.delete("/comment/:id/:comment_id/delete",function(req,res){
    Comment.findByIdAndDelete(req.params.comment_id,function(err,Comment){
        if(err){
            console.log(err)
        }else{
            res.redirect("/show/"+req.params.id)
        }
    })
})
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;