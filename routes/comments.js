var express = require("express");
var router = express.Router();
var listmenu = require("../routes/list");
var Comment = require("../routes/index");

router.post("/comment/:id",isLoggedIn,function(req,res){
    var author = req.body.author;
    var text = req.body.text;
    var newcomment={author:author,text:text}
    listmenu.findById(req.params.id,function(err,listmenu){
        if(err){
            console.log(err)
        }else{
            Comment.create(newcomment,function(err,Comment){
                if(err){
                    console.log(err)
                }else{
                    listmenu.comments.push(Comment)
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