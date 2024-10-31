const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: String,
    username: String,
    password: String,
    bookmark: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'addstartup'
        }
    ]
})

module.exports = mongoose.model("user", userSchema);