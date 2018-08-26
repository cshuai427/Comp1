const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation

const validateProfileInput = require('../../validation/profile');

// Load Profile Model
const Profile = require('../../models/Profile');

// Load User Model
const User = require('../../models/User');


//  @route  GET api/profile/test
//  @desc   Test profile route
//  @access Public

router.get('/test', (req, res)=> res.json({msg: "profile works"}));

//  @route  GET api/profile/test
//  @desc   Test users route
//  @access Private

router.get('/', passport.authenticate('jwt',
    {session: false}), (req, res) => {
    const errors = {};
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

//  @route  GET api/profile/profile/all
//  @desc   Get all profile
//  @access Public


router.get('/all', (req, res) =>
{
    const errors = {};
    Profile.find()
        .populate('user',['name', 'avatar'])
        .then(profiles => {
            if(!profiles){
                errors.noprofile = 'There are no profiles';
                return res.status(404).json(errors);
            }
            res.json(profiles);
        })
        .catch(err => res.status(404).json({profiles: 'There are no profiles'}));
});




//  @route  GET api/profile/:name
//  @desc   Get profile by id
//  @access Public

router.get('/:name', (req, res) => {
    const errors = {};

    // param can grab the url variable
    Profile.findOne({ user: req.user.name})

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

//  @route  GET api/profile/user/:user_id
//  @desc   Get profile by user ID
//  @access Public

router.get('/user/:user_id', (req, res) => {
    const errors = {};

    // param can grab the url variable
    Profile.findOne({ user: req.params.user_id})

        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if(!profile){
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }

            res.json(profile);
        })
        .catch(err => res.status(404).json({ profile: 'There is no profile for this user'}));


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
        profileFields.name = req.user.name;
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


        Profile.findOne({ user: req.user.id})
            .then(profile => {
                if(profile){
                    // Update
                    Profile.findOneAndUpdate(
                        { user: req.user.id},
                        { $set: profileFields},
                        { new: true}
                    ).then(profile => res.json(profile));
                } else {
                    // Create

                    // Check if name exists
                    Profile.findOne({ user: profileFields.name})
                        .then(profile => {
                            if(profile){
                                errors.name = 'That name already exists';
                                res.status(400).json(errors);
                            }

                            // Save Profile
                            new Profile(profileFields).save().then(profile => res.json(profile));
                        })
                }
            });
    });


//  @route  DELETE api/profile
//  @desc   Delete user and profile
//  @access Private

router.delete('/', passport.authenticate('jwt', {session: false}),
    (req, res) =>{

        Profile.findOneAndRemove({user: req.user.id})
            .then(() =>{
                User.findOneAndRemove({_id: req.user.id})
                    .then(() => res.json({success: true}))
            });
    });



module.exports = router;