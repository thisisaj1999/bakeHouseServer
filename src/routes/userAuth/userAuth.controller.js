const bcrypt = require('bcrypt')
const userSchema = require('../../modules/user.mongo')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const secretKey = process.env.JWT_SECRET

function httpGetLogin(req, res) {
    console.log("this is get login page");
}

async function httpPostLogin(req, res) {
    try {
        const user = req.user
        jwt.sign({ user },secretKey,{expiresIn:'300s'},(err,token)=>{
            if(err) return res.status(400).json({"error": err });
            res.cookie("jwtToken",token,{
                httpOnly:true,
                secure : process.env.COOKIE_SECRET,
            })
            return res.status(202).json({
                "msg" : "User is authenticated!!!",
                "user" : req.user,
                "token": token,
            })
        })
    } catch (err) {
        return res.status(400).json({"err" : err})
    }
}

async function httpGetLogout(req,res){
    try {
        return req.logout(function(err) {
            if (err) return res.status(400).json({"error": err });
            res.clearCookie("token");
            return res.status(202).json({
                "msg" : "user is logged out!!!"
            });
        });
    } catch (err) {
        return res.status(400).json({"err" : err})
    }
}

async function httpPostGoogleLogin(req,res){
    console.log("google authtication successful.");
    req.isAuthenticated() = true;
    return res.redirect('/secret')
}

function httpGetSignin(req, res) {
    console.log("this is get signin page");
}

async function httpPostSignin(req, res) {
    try {
        const data = req.body
        if (!(data.password == data.password1)) return res.status(401).json({ "error": "password is incorrect" })
        data.password = await bcrypt.hash(data.password, 10)
        delete data.password1;
        await userSchema.create(data);
        return res.status(201).json({
            "success": "user created."
        })
    } catch (err) {
        console.error(err);
        return res.redirect('/signin')
    }
}

async function httpPostProfile(req,res){
    try {
        const token = req.token
        jwt.verify(token,secretKey,(err,authData)=>{
            if(err) return res.status(400).json({"error":"invalid token"})
            else{
                return res.status(202).json({"success": "profile accessed!!!","authData":authData})
            }
        })
    } catch(err) {
        return res.status(400).json({"err" : err})
    }
}

function verifyJwtToken(req,res,next) {
    const token = req.cookies.jwtToken;
    if(typeof(token)!=undefined){
        req.token = token;   
        next();
    }else{
        return res.status(400).json({
            "error" : "Token is not valid."
        })
    }
}


function checkUser(req,res,next){
    console.log(req.user);
    if(req.isAuthenticated()) return next();
    else return res.send('your are not logged in!');
}

module.exports = {
    httpGetLogin,
    httpPostLogin,
    httpGetLogout,
    httpGetSignin,
    httpPostSignin,
    httpPostGoogleLogin,
    verifyJwtToken,
    httpPostProfile,
    checkUser,
}

// {
//     "name":"Shubu",
//     "username" : "thisIsShubu1999",
//     "password" : "shbu",
//     "password1" : "shbu",
//     "phone":888 
// }