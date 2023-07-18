// importing pakages
const express = require('express')
const session = require('express-session')
const passport = require('passport');
const path = require('path')

// importing local objects
const { authRouter } = require('./routes/userAuth/userAuth.router');
const { checkUser } = require('./routes/userAuth/userAuth.controller');
const initializePassport = require('./services/passport.config')

// making express instance
const app = express();

initializePassport(passport)

// using middlewares
// for json parsing
app.use(express.json());
// to parse incoming url requests
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())

// Routers
// user authentication router
app.get('/', (req,res)=>{
    if(req.isAuthenticated()) return res.status(200).json({"msg":"is authenticated"});
    else return res.status(401).json({"msg":"is not authenticated"});
    // return res.sendFile(path.join(__dirname,'views','index.html'));
})
app.get('/secret', checkUser , (req,res)=>{
    res.send("The SECERT IS 'I THANK U'")
})
app.use('/auth', authRouter);

// function checkUser(req,res,next){
//     if(req.isAuthenticated()) return next();
//     else return res.send('your are not logged in!');
// }

// if(req.isAuthenticated()) return res.status(200).json({"msg":"is authenticated"});
// else return res.status(401).json({"msg":"is not authenticated"});

module.exports = app;