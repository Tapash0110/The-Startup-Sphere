import mongoose from "mongoose";
const user_data = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
},{ timestamps: true })

export const user = mongoose.model('user', user_data);