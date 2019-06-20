var express = require("express");
var router = express.Router();
var listmenu = require("../models/listmenu");
var Comment = require("../models/comments");

router.post("/comment/:id",isLoggedIn,function(req,res){
    var author = req.body.author;
    var text = req.body.text;
    var newcomment={author:author,text:text}
    listmenu.findById(req.params.id,function(err,listmenu){
        if(err){
            console.log(err)
        }else{
            Comment.create(newcomment,function(err,Comments){
                if(err){
                    console.log(err)
                }else{

                    Comments.author.id = req.user._id;
                    Comments.author.username = req.user.username;
                    Comments.save()
                    listmenu.comments.push(Comments)
                    listmenu.save();
                    res.redirect("/show/"+req.params.id)
                }
            })
            
            
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