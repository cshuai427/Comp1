const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Input Validation
const validationRegisterInput = require('../../validation/register');
const validationLoginInput = require('../../validation/login');


// Load User model
const User = require('../../models/User');

//  @route  GET api/users/test
//  @desc   Test users route
//  @access Public

router.get('/test', (req, res)=> res.json({msg: "users works"}));

//  @route  GET api/users/register
//  @desc   Register user
//  @access Public

router.post('/register', (req, res)=> {

    // check the isvalid (true or false)
    const {errors, isValid} = validationRegisterInput(req.body);

    // check validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    // Check the user email from database
    User.findOne({ email: req.body.email})
        .then(user =>{
            if(user){
                // If user use a existing email to register
                errors.email = 'Email already exists';
                return res.status(400).json(errors);
            } else {
                // get the avatar from the email (Example: gmail have avatar)
                const avatar = gravatar.url(req.body.email,{
                    s: '200',   // Size
                    r: 'pg',    // Rating
                    d: 'mm'     // Default
                });

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password

                });

                bcrypt.genSalt(10, (err, salt) =>{
                    bcrypt.hash(newUser.password, salt, (err, hash) =>{
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));

                    });
                });
                console.log('register success');
            }
        });
});

//  @route  GET api/users/login
//  @desc   Login user / Returning JWT Token
//  @access Public
router.post('/login', (req, res) => {
    const {errors, isValid} = validationLoginInput(req.body);

    // check validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find user by email

    User.findOne({email})
        .then(user => {
            // Check for user
            if(!user){
                errors.email = 'User not found';
                return res.status(404).json(errors);
            }
            // Check password
            bcrypt.compare(password, user.password)
                .then(isMatch =>{
                    if(isMatch){
                        //  res.json({msg: 'Success'});
                        //  User Matched
                        const payload = { id: user.id, name: user.name, avatar: user.avatar }; //   Create JWT payload

                        //  Sign Token
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            { expiresIn: 7200},
                            (err, token) =>{
                                res.json({
                                    success: true,
                                    token: 'BasketballBuddy' + token
                                });
                            });
                    } else {
                        errors.password = 'Password incorrect';
                        return res.status(400).json(errors);
                    }
                });
        });
});

//  @route  GET api/users/current
//  @desc   Return current user
//  @access Private

router.get(
    '/current',
    passport.authenticate('jwt', {session: false}),
    (req, res)=>{
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        });
    });

module.exports = router;