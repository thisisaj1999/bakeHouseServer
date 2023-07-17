const express = require('express');
const authRouter = express.Router();
const passport = require('passport');

const {
    httpGetLogin,
    httpPostLogin,
    httpPostLogout,
    httpGetSignin,
    httpPostSignin,
    verifyJwtToken,
    httpPostProfile
} = require('./userAuth.controller');


// login route
authRouter.get('/login', httpGetLogin); 
authRouter.post('/login', passport.authenticate("local"), httpPostLogin);
authRouter.post('/logout', httpPostLogout);

// profile route
authRouter.post('/profile', verifyJwtToken, httpPostProfile)

// signin route
authRouter.get('/signin', httpGetSignin);
authRouter.post('/signin', httpPostSignin);



module.exports = { authRouter }