const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    email:String,
    username:String,
    password:String
})

module.exports=mongoose.model("user",userSchema);