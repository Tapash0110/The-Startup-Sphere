const mongoose=require('mongoose');

const companySchema=mongoose.Schema({
    email:String,
    username:String,
    password:String
})

module.exports=mongoose.model("company",companySchema);