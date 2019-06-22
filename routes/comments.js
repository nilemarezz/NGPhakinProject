var express = require("express");
var router = express.Router();
var listmenu = require("../models/listmenu");
var Comment = require("../models/comments");
var middleware = require("../middleware/index.js")

router.post("/comment/:id",middleware.isLoggedIn,function(req,res){
    
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

router.delete("/comment/:id/:comment_id/delete",middleware.checkCommentOwner,function(req,res){
    Comment.findByIdAndDelete(req.params.comment_id,function(err,Comment){
        if(err){
            console.log(err)
        }else{
            res.redirect("/show/"+req.params.id,{message:req.flash("error")})
        }
    })
})


module.exports = router;