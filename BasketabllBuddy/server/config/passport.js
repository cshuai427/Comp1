const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

const  jwtOption= {};
jwtOption.secretOrKey = keys.secretOrKey;
jwtOption.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

module.exports = passport => {
    // validate the token sent from front-end
    passport.use(
        // send value to function
        new JwtStrategy(jwtOption, (jwt_payload, done)=>{

            // find a user by id (extracted from token payload)
            // check if user exists in database to validate token
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
