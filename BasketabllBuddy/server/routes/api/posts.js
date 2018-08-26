const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post model
const Post = require('../../models/Post');

// Post model

const Profile = require('../../models/Profile');

// Validation

const validationPost = require('../../validation/post');
const validationPostComment = require('../../validation/comment');

//  @route  GET api/posts/test
//  @desc   Test post route
//  @access Public

router.get('/test', (req, res)=> res.json({msg: "post works"}));


//  @route  GET api/posts
//  @desc   Get post
//  @access Public

router.get('/', (req, res) =>
{
    Post.find()
        .sort({data: -1})
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({nopostfound: 'No post found'}));
});


//  @route  GET api/posts/:id
//  @desc   Get post
//  @access Public

router.get('/:id', (req, res) =>
{
    Post.findById(req.params.id)
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({nopostfound: 'No post found with that ID'}));
});




//  @route  Post api/posts
//  @desc   Create post
//  @access Private

router.post('/', passport.authenticate('jwt', { session: false}),
    (req, res) => {
        const {errors, isValid} = validationPost(req.body);

        // Check validation
        if(!isValid){
            //If any errors, send 400 with errors object
            return res.status(400).json(errors);
        }

        const newPost = new Post({
            eventTitle: req.body.eventTitle,
            eventText: req.body.eventText,
            eventPeopleNumber: req.body.eventPeopleNumber,
            eventLocation: req.body.eventLocation,
            haveBall: req.body.haveBall,
            eventDate: req.body.eventDate,
            eventOverStatus: req.body.eventOverStatus,
            avatar: req.body.avatar,
            user: req.user.id
        });

        newPost.save().then(post => res.json(post));
    });


//  @route  Delete api/posts/:id
//  @desc   Delete post
//  @access Private

router.delete('/:id', passport.authenticate('jwt', { session: false}),
    (req, res)=>
    {
        Profile.findOne({ user: req.user.id })
            .then(profile => {
                Post.findById(req.params.id)
                    .then(post => {
                        // Check for post owner
                        if(post.user.toString() !== req.user.id){
                            return res.status(401).json({ notauthorized: 'User not authorized'});

                        }

                        // Delete

                        post.remove().then(() => res.json({ success: true}));
                    })
                    .catch(err => res.status(404).json({ postnotfound: 'Not post found'}));
            });
    });


//  @route  Post api/posts/like/:id
//  @desc   Like post
//  @access Private

router.post('/like/:id', passport.authenticate('jwt', { session: false}),
    (req, res)=>
    {
        Profile.findOne({ user: req.user.id })
            .then( profile => {
                Post.findById(req.params.id)
                    .then(post => {
                        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
                            return res.status(400).json({ alreadyliked: 'User already liked this post'});
                        }

                        // Add user id to likes array

                        post.likes.unshift({ user: req.user.id});

                        post.save().then(post => res.json(post));

                    })
                    .catch(err => res.status(404).json({ postnotfound: 'Not post found'}));
            });
    });



//  @route  Post api/posts/unlike/:id
//  @desc   unlike post
//  @access Private

router.post('/unlike/:id', passport.authenticate('jwt', { session: false}),
    (req, res)=>
    {
        Profile.findOne({ user: req.user.id })
            .then( profile => {
                Post.findById(req.params.id)
                    .then(post => {
                        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
                            return res.status(400).json({ notliked: 'You have not yet liked this post'});
                        }

                        // Get remove index
                        const removeIndex = post.likes
                            .map(item => item.user.toString())
                            .indexOf(req.user.id);

                        // Splice out of array

                        post.likes.splice(removeIndex, 1);

                        // Save

                        post.save().then(post => res.json(post));

                    })
                    .catch(err => res.status(404).json({ postnotfound: 'Not post found'}));
            });
    });




module.exports = router;