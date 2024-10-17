import express from "express";
const route = express.Router();

route.get('/',(req,res)=>{
    res.json({req:"api request recieved"})
})




export default route;