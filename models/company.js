const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    email: String,
    username: String,
    password: String,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'addstartup'
    }]
})

module.exports = mongoose.model("company", companySchema);