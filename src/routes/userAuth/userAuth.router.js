const express = require('express');
const authRouter = express.Router();
const passport = require('passport');

const {
    httpGetLogin,
    httpPostLogin,
    httpGetLogout,
    httpGetSignin,
    httpPostGoogleLogin,
    httpPostSignin,
    verifyJwtToken,
    httpPostProfile
} = require('./userAuth.controller');


// login route
authRouter.get('/login', httpGetLogin);
authRouter.post('/login', passport.authenticate("local"), httpPostLogin);
authRouter.get('/logout', httpGetLogout);

// profile route
authRouter.post('/profile', verifyJwtToken, httpPostProfile)

authRouter.get('/google', passport.authenticate('google', {
    scope: ['email'],
}),httpPostGoogleLogin)

authRouter.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/failure',
        successRedirect: '/secret',
        session: true,
    }),
    (req, res) => {
        console.log("google called us back");
    }
);

// signin route
authRouter.get('/signin', httpGetSignin);
authRouter.post('/signin', httpPostSignin);



module.exports = { authRouter }