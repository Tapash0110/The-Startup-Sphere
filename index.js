const express=require('express');
const app=express();

const path=require('path');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const cookieParser=require('cookie-parser');
const addstartupModel=require('./models/addstartup');
const userModel=require('./models/user');
const companyModel=require('./models/company');

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));

function isloggedin(req,res,next){
    if(req.cookies.token===""||req.cookies.token==null){
        res.redirect('/');
    }
    else{
        let data=jwt.verify(req.cookies.token,"shhhhh");
        next();
    }
}
app.get('/',function(req,res){
    res.render('home');
})

app.get("/addstartup",isloggedin,function(req,res){
    res.render("addstartup");
})

app.get("/login",function(req,res){
    res.render("login");
})

app.get("/signup",function(req,res){
    res.render("signup");
})

app.get("/profile",isloggedin,function(req,res){
    res.render("index");
})

app.post("/usersignup",async function(req,res){
    let {username,email,password}=req.body;
    let user1=await userModel.findOne({email});
    if(user1) return res.render("signup",{userstatus:"Email already exsist"});
    let user2=await userModel.findOne({username});
    if(user2) return res.render("signup",{userstatus:"Usename already exsist"});

    bcrypt.genSalt(12,function(err,salt){
        bcrypt.hash(password,salt,async function(err,hash){
            let createduser=await userModel.create({
                username,
                email,
                password:hash
            })

            let token=jwt.sign({email,userid:createduser._id},"shhhhh");
            res.cookie("token",token);
 
            res.redirect('profile');
        })
    })
})

app.post("/companysignup",async function(req,res){
    let {username,email,password}=req.body;
    let user1=await companyModel.findOne({email});
    if(user1) return res.render("signup",{companystatus:"Email already exsist"});
    let user2=await companyModel.findOne({username});
    if(user2) return res.render("signup",{companystatus:"Usename already exsist"});

    bcrypt.genSalt(12,function(err,salt){
        bcrypt.hash(password,salt,async function(err,hash){
            let createduser=await companyModel.create({
                username,
                email,
                password:hash
            })

            let token=jwt.sign({email,userid:createduser._id},"shhhhh");
            res.cookie("token",token);
 
            res.redirect('profile');
        })
    })
})

app.post('/userlogin',async function(req,res){
    let {email,password}=req.body;
    let user=await userModel.findOne({email});
    if(!user) return res.render("login",{userstatus:"Email not registered try signup"});

    bcrypt.compare(password,user.password,function(err,result){
        if(result){
            let token=jwt.sign({email,userid:user._id},"shhhhh");
            res.cookie("token",token);
            res.redirect('/profile');
        }
        else res.render("login",{userstatus:"password not matched"});
    })
})

app.post('/companylogin',async function(req,res){
    let {email,password}=req.body;
    let user=await companyModel.findOne({email});
    if(!user) return res.render("login",{companystatus:"Email not registered try signup"});

    bcrypt.compare(password,user.password,function(err,result){
        if(result){
            let token=jwt.sign({email,userid:user._id},"shhhhh");
            res.cookie("token",token);
            res.redirect('/profile');
        }
        else res.render("login",{companystatus:"password not matched"});
    })
})

app.get('/logout',function(req,res){
    res.cookie("token","");
    res.redirect('/');
})


app.post('/addstartup',isloggedin,async function(req,res){
    let {name,industry,otherindustry,size,founded,hq,stage,investor,otherinvestor,funding,motive,link}=req.body;
    let newstartup=await addstartupModel.create({
        name,
        industry,
        otherindustry,
        size,
        founded,
        hq,
        stage,
        investor,
        otherinvestor,
        funding,
        motive,
        link
    })
    res.redirect('/profile');
})

app.post('/findstartup',isloggedin,async function(req,res){
    let obj = req.body
    let obj2 = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const element = obj[key];
            if (element != "") {
                obj2[key] = element;
            }
        }
    }
    
    let startups=await addstartupModel.find(obj2)
    console.log(startups);
    res.render('index',{startups});
})

app.listen(3000);