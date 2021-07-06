const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const asyncHandler = require('../middleware/async');

// @desc      login a user
// @route     POST /api/v1/auth/login
// @access    public
exports.login = asyncHandler(async (req, res, next) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Invalid Credentials',
                user   : user
            });
        }
       req.login(user, {session: false}, (err) => {
           if (err) {
               res.send(err);
           }
           // generate a signed son web token with the contents of user object and return it in the response
           const token = jwt.sign(user, process.env.JWT_SECRET);
           return res.json({user, token});
        });
    })(req, res);
});