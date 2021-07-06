//passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const User = require('./models/User');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    async function (email, password, cb) {
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        try {
            const user = await User.findOne({ email}).select('+password');

            if (!user) {
                return cb(null, false, { message: 'Incorrect email or password.' });
            }
            const isMatch = await user.matchPassword(password);

            if (!isMatch) {
                return next(new ErrorResponse('Invalid credentials', 401));
            }
            return cb(null, user.toObject(), { message: 'Logged In Successfully' });
        } catch (err) {
            cb(err);
        }
    }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
},
    async function (jwtPayload, cb) {
        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        try {
            const user = await User.findById(jwtPayload._id)
            return cb(null, user);
        } catch (err) {
            return cb(err);
        }
    }
));