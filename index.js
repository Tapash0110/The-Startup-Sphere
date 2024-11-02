const express = require('express');
const app = express();

const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const addstartupModel = require('./models/addstartup');
const userModel = require('./models/user');
const companyModel = require('./models/company');
const data = require('./models/data');
const { findOne } = require('./models/data');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

function isloggedin(req, res, next) {
    if (req.cookies.token === "" || req.cookies.token == null) {
        res.redirect('/login');
    }
    else {
        let data = jwt.verify(req.cookies.token, "shhhhh");
        req.user = data;
        next();
    }
}

app.get('/', function (req, res) {
    res.render('home');
})

app.get("/login", function (req, res) {
    res.render("login");
})

app.get("/signup", function (req, res) {
    res.render("signup");
})

app.get("/profile", isloggedin, async function (req, res) {
    let user = await userModel.findOne({ email: req.user.email });
    res.render("index", { user });
})

app.get('/bookmarkpage', isloggedin, async function (req, res) {
    let user = await userModel.findOne({ email: req.user.email });
    let startups = await addstartupModel.find({ _id: { $in: user.bookmark } });
    res.render('bookmarkpage', { user, startups });
})

app.get('/companypage', isloggedin, async function (req, res) {
    let company = await companyModel.findOne({ email: req.user.email }).populate("posts");
    res.render('companypage', { company });
})

app.get('/delete/:id', isloggedin, async function (req, res) {
    let startup = await addstartupModel.findOneAndDelete({ _id: req.params.id }).populate("postedby");
    let company = await companyModel.findOneAndUpdate({ email: req.user.email }, { $pull: { posts: startup._id } });
    res.redirect('/companypage');
})

app.get('/bookmark/:id', isloggedin, async function (req, res) {
    let user = await userModel.findOne({ email: req.user.email });
    let startup = await addstartupModel.findOne({ _id: req.params.id });
    if (user.bookmark.indexOf(startup._id) === -1) {
        user.bookmark.push(startup._id);
        startup.bookmarkedby.push(user._id);
        await user.save();
        await startup.save();
        res.json({status:1,id:startup._id});;
    }
    else {
        user.bookmark.splice(user.bookmark.indexOf(startup._id), 1);
        startup.bookmarkedby.splice(startup.bookmarkedby.indexOf(user._id), 1);
        await user.save();
        await startup.save();
        res.json({status:0,id:startup._id});
    }
})

app.get('/update/:id',isloggedin,async function(req,res){
    let startup=await addstartupModel.findOne({_id:req.params.id});
    res.render('update',{startup});
})

app.post('/update/:id',isloggedin,async function(req,res){
    let {name,industry,otherindustry,size,founded,location,stage,experience,motive,websitelink,twitterlink,linkedinlink,maplink,imagelink}=req.body;
    let startup=await addstartupModel.findOneAndUpdate({_id:req.params.id},{name,industry,otherindustry,size,founded,location,stage,experience,motive,websitelink,twitterlink,linkedinlink,maplink,imagelink});
    res.redirect('/companypage');
})

app.get("/addstartup", isloggedin, function (req, res) {
    res.render("addstartup");
})

app.post("/usersignup", async function (req, res) {
    let { username, email, password } = req.body;
    let user1 = await userModel.findOne({ email });
    if (user1) return res.json({ status: 0, error: "email" })
    let user2 = await userModel.findOne({ username });
    if (user2) return res.json({ status: 0, error: "username" })

    bcrypt.genSalt(12, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            let createduser = await userModel.create({
                username,
                email,
                password: hash
            })

            let token = jwt.sign({ email, userid: createduser._id }, "shhhhh");
            res.cookie("token", token);

            res.json({ status: 1, error: "" })
        })
    })
})
app.post("/companysignup", async function (req, res) {
    let { username, email, password } = req.body;
    let user1 = await companyModel.findOne({ email });
    if (user1) return res.json({ status: 0, error: "email" })
    let user2 = await companyModel.findOne({ username });
    if (user2) return res.json({ status: 0, error: "username" })

    bcrypt.genSalt(12, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            let createduser = await companyModel.create({
                username,
                email,
                password: hash
            })

            let token = jwt.sign({ email, userid: createduser._id }, "shhhhh");
            res.cookie("token", token);

            res.json({ status: 1, error: "" })
        })
    })
})

app.post('/userlogin', async function (req, res) {
    let { email, password } = req.body;
    console.log({ email, password });

    let user = await userModel.findOne({ email });
    if (!user) return res.json({ status: 0, error: "email" })

    bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
            let token = jwt.sign({ email, userid: user._id }, "shhhhh");
            res.cookie("token", token);
            res.json({ status: 1, error: "" });
        }
        else res.json({ status: 0, error: "password" })
    })
})

app.post('/companylogin', async function (req, res) {
    let { email, password } = req.body;
    console.log({ email, password });

    let user = await companyModel.findOne({ email });
    if (!user) return res.json({ status: 0, error: "email" })

    bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
            let token = jwt.sign({ email, userid: user._id }, "shhhhh");
            res.cookie("token", token);
            res.json({ status: 1, error: "" })
        }
        else res.json({ status: 0, error: "password" })
    })
})

app.get('/logout', function (req, res) {
    res.cookie("token", "");
    res.redirect('/');
})

app.post('/addstartup', isloggedin, async function (req, res) {
    let company = await companyModel.findOne({ email: req.user.email });
    let { name, industry, otherindustry, size, founded, location, experience, stage, motive, websitelink, maplink, linkedinlink, twitterlink, imagelink } = req.body;
    let newstartup = await addstartupModel.create({
        name,
        industry,
        otherindustry,
        size,
        founded,
        location,
        stage,
        experience,
        motive,
        websitelink,
        maplink,
        linkedinlink,
        twitterlink,
        imagelink,
        postedby: company._id
    })
    console.log(newstartup);

    //updating data 
    let impdata = await data.findOne();
    console.log(impdata);

    if (!impdata) {
        impdata = await data.create({ location: location.toLowerCase() });
    }
    else {
        if (impdata.location.indexOf(location.toLowerCase()) === -1) {
            impdata.location.push(location.toLowerCase());
        }
    }
    console.log(impdata);
    await impdata.save();

    company.posts.push(newstartup._id);
    await company.save();
    res.redirect('/companypage');
})

app.post('/findstartup', isloggedin, async function (req, res) {
    const user = await userModel.findOne({ email: req.user.email });
    let obj = req.body
    console.log(obj);

    for (const key in obj) {
        if (obj[key] === "") {
            delete obj[key];
        }
    }
    let startups;
    if (obj.name) {
        startups = await addstartupModel.find({ name: { $regex: obj.name, $options: "i" } })
    } else {
        startups = await addstartupModel.find(obj)
    }
    res.render('index', { startups, user });
})

app.get("/getdata", isloggedin, async function (req, res) {
    let impdata = await data.findOne()
    res.json(impdata);
})

app.listen(3000);