var mongoose = require("mongoose");

var listmenuSchema = new mongoose.Schema({
    name:String,
    pic:String,
    description : String,
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }]
})
var listmenu = mongoose.model("listmenu",listmenuSchema);

module.exports = listmenu;