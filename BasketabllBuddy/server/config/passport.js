const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

const  jwtOption= {};
jwtOption.secretOrKey = keys.secretOrKey;
jwtOption.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

module.exports = passport => {
    passport.use(
        new JwtStrategy(jwtOption, (jwt_payload, done)=>{
            //console.log(jwt_payload);
            User.findById(jwt_payload.id)
                .then(user => {
                    if(user){
                        return done(null, user);
                    }
                    return done(null, fasle);
                })
                .catch(err => console.log(err));
        })
    );
};
