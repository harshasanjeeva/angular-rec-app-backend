
var mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
   username:{type:String, unique:true},
   name:String,
   email:String,
   phone:String,
   password:String,     
});

var User = mongoose.model("users",userSchema);

module.exports = User;