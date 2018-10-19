const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load Validation

const validateProfileInput = require('../../validation/profile');

// Load Profile Model
const Profile = require('../../models/Profile');


//  @route  GET api/profile/
//  @desc   Test users route
//  @access Private

router.get('/', passport.authenticate('jwt', {session: false}),
    (req, res) => {

    const errors = {};
    // find a user and extract profile data
    // if exist, send info to front-end ( not including password)
    Profile.findOne({user: req.user.id})
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if(!profile){
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});


//  @route  GET api/profile/:nickName
//  @desc   Get profile by nickname
//  @access Public

router.get('/nickname/:nickName', (req, res) => {
    const errors = {};

    // get user nickname from route and send info back to front-end
    Profile.findOne({ nickName: req.params.nickName})

        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if(!profile){
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));


});


//  @route  POST api/profile
//  @desc   Create users and edit route
//  @access Private

router.post ('/', passport.authenticate('jwt', {session: false}),
    (req, res) => {
        const { errors, isValid } = validateProfileInput(req.body);

        // Check Validation
        if(!isValid){
            // Return any errors with 400 status
            return res.status(400).json(errors);
        }


        // Get fields
        const profileFields = {};

        profileFields.user = req.user.id;

        if(req.body.nickName) profileFields.nickName = req.body.nickName;
        if(req.body.playerRole) profileFields.playerRole = req.body.playerRole;
        if(req.body.aboutMe) profileFields.aboutMe = req.body.aboutMe;


        // Skills - Spilt into array
        if(typeof req.body.interests !== 'undefined'){
            profileFields.interests = req.body.interests.split(',');
        }

        // Social
        profileFields.social = {};

        if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
        if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
        if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
        if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
        if(req.body.instagram) profileFields.social.instagram = req.body.instagram;


        // find a user profile and create new profile
        // if exist, update profile value
        Profile.findOne({ user: req.user.id})
            .then(profile => {
                if(profile){
                    // Update
                        Profile.findOneAndUpdate(
                            { user: req.user.id},
                            { $set: profileFields},
                            { new: true}
                        ).then(profile => res.json(profile));
                }
                else {
                    // Create
                    // Check if nickName exists
                    Profile.findOne({ nickName: profileFields.nickName})
                        .then(profile => {
                            if(profile){
                                errors.nickName = 'That nickName already exists';
                                res.status(400).json(errors);
                            }

                            // Save Profile
                            new Profile(profileFields).save().then(profile => res.json(profile));
                        })
                }
            });
    });





module.exports = router;
