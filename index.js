const express = require('express');
const app = express();
const ejs = require('ejs');
const user = require('./schemas/user');
const post = require('./schemas/post');
const comment = require('./schemas/comment')
const bodyParser = require('body-parser')
const Auth = require('./utils/Auth')
const passport = require('passport');  // authentication
const options = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}
var LocalStrategy = require('passport-local').Strategy;
const session = require('express-session'); app.use(session(options));
app.use(passport.initialize());
app.use(passport.session());
const initialize = require('./utils/passportConfig');
var router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const flash = require('express-flash'); app.use(flash());

const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/forumDB').then(()=>{
    console.log("Database connected.");
}).catch((e)=>{console.log(e)});
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
    secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
  }));

app.use(bodyParser.json())
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.set('view engine','ejs')
app.use(router); /// Must be the last thing to call.


router.route('/')
.get(async(req,res)=>{
    const allPosts = await post.find({}).populate('user')
    res.render('home',{allPosts});
})
.post((req,res)=>{
    console.log(req.body)
    res.redirect('/')
})
router.route('/ask')
.get((req,res)=>{
    res.render('query')
})


router.route('/users/:id')
.get(async(req,res)=>{
    const {id} = req.params;
    const foundPost = await post.find({user:id}).populate({
        path: 'comments',
        populate: {
            path:'user'
        }
    }).populate('user')
    res.render('show',{foundPost});
})

router.route('/login')
.get((req,res)=>{
    res.render('login')
})
.post(passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}),async(req,res)=>{
    // try{
    //         const {password,username} = req.body;
    //         const foundUser = await user.find({username});
    //         console.log(foundUser)
    //         if(!foundUser[0]) throw ({message: "Please authenticate first"})
    //         bcrypt.compare(password, foundUser[0].password, function(error, isMatch) {
    //         if (error) {
    //         throw error
    //         } else if (!isMatch) {
    //         throw ({message:"Please authenticate first"})
    //         } else {
    //             req.user = foundUser
    //             console.log(foundUser) 
    //             res.redirect('/'); 
    //         }
    //   })

    // } catch(e){
    //     res.send(e.message)
    // }
    
})


router.route('/register')
.get((req,res)=>{
    res.render('register')
})
.post(async(req,res)=>{
    console.log(req.body);
    const {username,password,name} = req.body;
    // const token = generateAuthToken({ username });
    const newUser = new user({username,name,password})
    res.redirect('/');
})

router.route('/getPosts')
.post(async(req,res)=>{
    const payload = req.body.payload.trim();
    var foundPost = await post.find({title:{$regex: new RegExp('^'+payload+'.*','i')}}).populate('user');
    /// Limit search results to 10.
    // foundPost = foundPost.slice(0,10);
    const toSend = {payload:foundPost}
    console.log(toSend)
    res.send(toSend);
})


const port = 3000||process.env.port
app.listen(3000,()=>{
    console.log(`App listening on port ${port}`);
})