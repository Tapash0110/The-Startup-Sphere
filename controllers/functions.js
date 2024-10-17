// import express from 'express'
// const __dirname = import.meta.dirname;
// import path from 'path'
import { connectdbs } from "../connection.js";
import { Startup } from "../models/startup_data.js";
import { user } from '../models/user_data.js';


connectdbs();

async function addstartuptodbs(req, res) {
    console.log("its a post request")
    const recieved_data = req.body
    // res.send(recieved_data)
    const newstartup = new Startup(recieved_data);
    newstartup.save()

    // res.sendFile(path.join(__dirname, '..', '/pages', 'redirect.html'))
    res.redirect('/')

}

async function findfromdbs(req, res) {
    let obj = req.body
    let obj2 = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const element = obj[key];
            if (element != "") {
                // console.log(key, element);
                obj2[key] = element;
            }
        }
    }

    let temp = await Startup.find(obj2);
    res.send(temp);
}

async function adduser(req, res) {
    try {
        const userdata = req.body;
        // console.log(userdata);
        const existingUser = await user.findOne({
            $or: [
                { email: userdata.email },
                { username: userdata.username },
            ]
        }); // or any other unique field

        if (existingUser) {
            let comment = "";
            if (existingUser.email === userdata.email) {
                comment = "email already exists try login"
            } else {
                comment = "username already exists try another"
            }
            res.json({ status: comment, statuscode: 0 });
        } else {
            console.log(userdata)
            const new_user = new user({
                email: userdata.email,
                password: userdata.password,
                username: userdata.username
            });
            await new_user.save();
            res.json({ status: 'user added:)', statuscode: 1 });
        }
    } catch (error) {
        res.status(404).json({ status: `some error has occurred `, statuscode: 0 });
    }
}
async function loginuser(req, res) {
    try {
        const userdata = req.body;
        console.log(userdata);
        const existingUser = await user.findOne({ username: userdata.username }); // or any other unique field

        if (existingUser) {
            let comment = "";
            if (existingUser.password === userdata.password) {
                comment = "Log in successful"
                //set cookie
                res.cookie('uid',existingUser.id);
                res.json({ status: comment, statuscode: 1 });
            } else {
                comment = "wronge password??"
                res.json({ status: comment, statuscode: 0 });
            }
        } else {
            res.json({ status: 'username not found try login', statuscode: 0 });
        }
    } catch (error) {
        res.status(404).json({ status: `some error has occurred `, statuscode: 0 });
    }
}



export { findfromdbs, addstartuptodbs, adduser, loginuser };
