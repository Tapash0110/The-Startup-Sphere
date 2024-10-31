const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/startupsphere')

const addstartupSchema=mongoose.Schema({
    name:String,
    industry:String,
    otherindustry:String,
    size:String,
    founded:String,
    location:String,
    experience:String,
    stage:String,
    investor:String,
    otherinvestor:String,
    funding:String,
    motive:String,
    link:String,
    postedby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'company'
    },
    bookmarkedby: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }]
})

module.exports=mongoose.model("addstartup",addstartupSchema);