import mongoose from "mongoose";
// const mongoose =require("mongoose")
const Startup_schema = new mongoose.Schema({
    name: String,
    industry: String,
    other_industry: String,
    size: String,
    founded: Number,
    hq: String,
    stage: String,
    investor: String,
    other_investor: String,
    funding: String,
    motive: String,
    link: String
})

export const Startup = mongoose.model('Startup', Startup_schema);