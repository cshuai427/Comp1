const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const emailConfirm = require('../../utils/EmailConfirm');

// Load Input Validation
const validationRegisterInput = require('../../validation/register');
const validationLoginInput = require('../../validation/login');

// Load User model
const User = require('../../models/User');

//  @route  GET api/users/register
//  @desc   Register user
//  @access Public

router.post('/register', (req, res) => {

    // check the isvalid (true or false)
    const {errors, isValid} = validationRegisterInput(req.body);

    // check validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    // Check the user email from database
    User.findOne({ email: req.body.email})
        .then(user => {
            if(user){
                // If user use a existing email to register
                errors.email = 'Email already exists';
                return res.status(400).json(errors);
            } else {
                // Get the avatar from the email (Example: gmail have avatar)
                const avatar = gravatar.url(req.body.email,{
                    s: '200',   // Size
                    r: 'pg',    // Rating
                    d: 'mm'     // Default
                });

                // Create a new user
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                });

                let payload = {};
                bcrypt.genSalt(10, (err, salt) => {
                    // Use 'salt' create randomly string into the hash
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        // Hash user password
                        newUser.save()
                            // Return user data to front-end and store data in redux
                            .then(user => {
                                res.json(user);
                                // Send info back for email confirmation
                                payload ={
                                    id: user._id,
                                    email: user.email,
                                };
                                emailConfirm(payload);
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
});

//  @route  GET api/users/login
//  @desc   Login user / Returning JWT Token
//  @access Public
router.post('/login', (req, res) => {

    const {errors, isValid} = validationLoginInput(req.body);

    // Check validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find user by email

    User.findOne({ email })
        .then(user => {
            // Check for user
            if(!user){
                errors.email = 'User not found';
                return res.status(404).json(errors);
            }
            // Check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch){
                        //  User Matched
                        if(user.confirmed === true){
                            //   Create JWT payload
                            const payload = { id: user.id, name: user.name, avatar: user.avatar };

                            //  Sign Token
                            jwt.sign(
                                payload,
                                keys.secretOrKey,
                                {expiresIn: 7200},
                                (err, token) => {
                                    // Send expire time and token(including user detail=> payload) to front-end
                                    res.json({
                                        success: true,
                                        token: 'Bearer ' + token
                                    });
                                });
                        } else {
                            errors.confirmed = 'Please confirm your email';
                            return res.status(400).json(errors);
                        }

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

router.get('/current', passport.authenticate('jwt', {session: false}),
    (req, res) => {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        });
    });




//  @route  GET api/users/email/confirm/:token
//  @desc   Confirm user email
//  @access Private

router.get('/email/confirm/:token', (req, res) => {

    // Validate token send back from email
        jwt.verify(
            req.params.token,
            keys.secretOrKey,
            (err, user) => {
                if (err) return next(err);
                // Find a user and update user data
               User.findOne({_id: user.id})
                    .then(user =>
                    {
                        // Find the user and Update
                        if(user){
                            User.findOneAndUpdate(
                                {_id: user.id},
                                {confirmed: true }
                            ).then(res => res.json('Email confirmed'));

                            res.redirect(`${keys.clientURL}/login`);
                        }
                    })
                    .catch(err => res.status(400).json('User not found'))
            });
    });



module.exports = router;
