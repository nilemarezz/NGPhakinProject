var mongoose = require("mongoose");

var listmenuSchema = new mongoose.Schema({
    name:String,
    pic:String,
    price:Number,
    Score:Number,
    description : String,
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    },
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }],
    fblink:String
})
var listmenu = mongoose.model("listmenu",listmenuSchema);

module.exports = listmenu;