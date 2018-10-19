const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

const  jwtOption= {};
jwtOption.secretOrKey = keys.secretOrKey;
jwtOption.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

module.exports = passport => {
    // Validate the token sent from front-end
    passport.use(
        // Send value to function
        new JwtStrategy(jwtOption, (jwt_payload, done)=>{

            // Find a user by id (extracted from token payload)
            // Check if user exists in database to validate token
            User.findById(jwt_payload.id)
                .then(user => {
                    if(user){
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch(err => console.log(err));
        })
    );
};
