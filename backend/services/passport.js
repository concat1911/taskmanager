const passport = require('passport');

//GOOGLE LOGIN OAUTH STRATEGY
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

//MONGODB
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(new GoogleStrategy(
    {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
        const existingUser =  await User.findOne({googleId: profile.id})

        if(existingUser){
            return done(null, existingUser);
        } 
        //This is new User
        const user = await new User({googleId: profile.id}).save()
        done(null, user);           
    })
);