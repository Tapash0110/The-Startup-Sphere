import express from "express";
const route = express.Router();
const __dirname = import.meta.dirname;
import path from 'path'
import { findfromdbs } from "../controllers/functions.js";

//middleware
route.use(express.json())
route.use(express.urlencoded({ extended: false }));



route.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'/..','/index.html'))
})

route.post('/find', findfromdbs);
route.get('/showlog',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','logs','req_log.txt'))
})

// route.post('/loadcard', async (req, res) => {
//     let temp = await Startup.find({});
//     // console.log(temp)
//     res.send(temp)
// })

export default route;



