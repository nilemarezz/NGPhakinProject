var mongoose = require("mongoose");

var Pattern = new mongoose.Schema({
    name:String,
    pic:String,
    description : String
})
var listmenu = mongoose.model("listmenu",Pattern);

module.exports = listmenu;