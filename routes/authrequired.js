import express from "express";
import { connectdbs } from "../connection.js";
import { user } from "../models/user_data.js";

const route = express.Router();
connectdbs();

route.all('/', async (req, res) => {
    const uid = req.cookies.uid;
    console.log(uid)
    if (!uid) {
        res.json({ status: "Not logged in", statuscode: 0, username: "" })
    } else {
        const registereduser =await user.findById(uid);
        res.json({ status: "looged in", statuscode: 1, username: registereduser.username })
    }
    // res.json({ req: "auth requred to complete request" })
})




export default route;
