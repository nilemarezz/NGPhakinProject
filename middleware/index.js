var Comment = require("../models/comments");
var listmenu = require("../models/listmenu");
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please Login First!!")
    res.redirect("/login");
}

middlewareObj.checkCommentOwner = function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,Comment){
            if(err){
                console.log(err)
                res.redirect("back")
            }else{
                if(Comment.author.id.equals(req.user._id)){
                    next();
                }else{
                    res.redirect("back");
                }
                
            }
        })
    }else{
        
        res.redirect("back");
    }
}

middlewareObj.checklistOwner = function(req,res,next){
    if(req.isAuthenticated()){
        listmenu.findById(req.params.id,function(err,list){
            if(err){
                console.log(err)
                res.redirect("back")
            }else{
                if(list.author.id.equals(req.user._id)){
                    next();
                }else{
                    res.redirect("back");
                }
                
            }
        })
    }else{
        res.redirect("back");
    }
}

module.exports = middlewareObj;