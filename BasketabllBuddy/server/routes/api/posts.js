const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Posts model
const Post = require('../../models/Post');

// Posts model

const Profile = require('../../models/Profile');

// Validation

const validationPost = require('../../validation/post');
const validationPostComment = require('../../validation/comment');

//  @route  GET api/posts/test
//  @desc   Test post route
//  @access Public

router.get('/test', (req, res)=> res.json({msg: "Posts works"}));


//  @route  GET api/posts
//  @desc   Get post
//  @access Public
router.get('/page/:pages', (req, res) => {
    let perPage = 5;
    let current = req.params.pages || 1;

    Post.find()
        .sort({data: -1})
        .skip(perPage * current - perPage)
        .limit(perPage)
        .then(posts => {
            Post.countDocuments()
                .then(count => {
                    res.json({
                        posts: posts,
                        currentPage: current,
                        totalPages: Math.ceil(count / perPage)
                    });
                });
        })
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


//  @route  Posts api/posts
//  @desc   Create post
//  @access Private

router.post('/',
    passport.authenticate('jwt', { session: false}),
    (req, res) => {
        const {errors, isValid} = validationPost(req.body);

        console.log(req.body);
        //Check validation
        if(!isValid){
            //If any errors, send 400 with errors object
            console.log("bad!");
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
            photo: req.body.photo,
            user: req.user.id,
            avatar: req.body.avatar,
            nickName: req.body.nickName
        });

        newPost.save().then(post => res.json(post));
    });


//  @route  Delete api/posts/:id
//  @desc   Delete post
//  @access Private

router.delete('/:id', passport.authenticate('jwt', { session: false}),
    (req, res)=>
    {
        Profile.findOneAndDelete({ user: req.user.id })
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
                    .catch(err => res.status(404).json({ postnotfound: 'No post found'}));
            });
    });


//  @route  Posts api/posts/like/:id
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
                    .catch(err => res.status(404).json({ postnotfound: 'No post found'}));
            });
    });



//  @route  Posts api/posts/unlike/:id
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
                    .catch(err => res.status(404).json({ postnotfound: 'No post found'}));
            });
    });

//  @route  Posts api/posts/comment/:id
//  @desc   Add comment to post
//  @access Private

router.post('/comment/:id', passport.authenticate('jwt', { session: false}),
    (req, res) => {

        const {errors, isValid} = validationPostComment(req.body);

        // Check validation
        if(!isValid){
            //If any errors, send 400 with errors object
            return res.status(400).json(errors);
        }


        Post.findById(req.params.id)
            .then(post => {
                const newComment =({
                    text: req.body.text,
                    nickName: req.body.nickName,
                    avatar: req.body.avatar,
                    user: req.user.id
                });

                // Add to comments array

                post.comments.unshift(newComment);

                // Save

                post.save().then(post => res.json(post));
            })
            .catch(err => res.status(404).json({ postnotfound: 'No post found'}));
    });



//  @route  DELETE api/posts/comment/:id/:comment_id
//  @desc   Remove comment from post
//  @access Private

router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false}),
    (req, res) => {

        Post.findById(req.params.id)
            .then(post => {

                // Check to see if comment exists
                if(post.comments.filter(comment =>
                    comment._id.toString() === req.params.comment_id).length === 0) {
                    return res.status(404).json({ commentnotexists: 'Comment does not exist'});
                }


                // Get remove Index

                const removeIndex = post.comments
                    .map(item => item._id.toString())
                    .indexOf(req.params.comment_id);

                // Splice comment out of array
                post.comments.splice(removeIndex, 1);

                post.save().then(post => res.json(post));
            })
            .catch(err => res.status(404).json({ postnotfound: 'No post found'}));
    });

//eventAttendPeople
//  @route  Post api/posts/attend/:post_id
//  @desc   Attend post
//  @access Private


router.post('/attend/:post_id', passport.authenticate('jwt', { session: false}),
    (req, res)=>
    {

        console.log(req.params.post_id);

        Profile.findOne({ user: req.user.id })
            .then( profile => {
                Post.findById(req.params.post_id)
                    .then(post => {
                        const newAttendUser = {
                            user: req.user.id,
                            nickName: req.body.nickName,
                            avatar: req.body.avatar
                        };

                        if(post.eventAttendPeople.filter(attend => attend.user.toString() === req.user.id).length > 0){
                            return res.status(400).json({ alreadyselected: 'User already select attend this event'});
                        }
                        if(post.user.toString() === req.user.id)
                        {
                            return res.status(400).json({ ownerselected: 'You can not use this function for you own event'})
                        }


                            // Add user id to eventAttendPeople array

                            post.eventAttendPeople.unshift(newAttendUser);

                            post.save().then(post => res.json(post));

                    })
                    .catch(err => res.status(404).json({ postnotfound: 'Not post found'}));
            });
    });



//  @route  Post api/posts/unattend/:post_id
//  @desc   won't attend event
//  @access Private

router.post('/unattend/:post_id', passport.authenticate('jwt', { session: false}),
    (req, res)=>
    {
        Profile.findOne({ user: req.user.id })
            .then( profile => {
                Post.findById(req.params.post_id)
                    .then(post => {

                        if(post.user.toString() ===  req.user.id){
                            return res.status(400).json({ unattend: 'This is your event, you must attend.'});
                        }

                        if(post.eventAttendPeople.filter(attend => attend.user.toString() === req.user.id).length === 0){
                            return res.status(400).json({ unattend: 'You have not yet select to attend this event'});
                        }

                        // Get remove index
                        const removeIndex = post.eventAttendPeople
                            .map(item => item.user.toString())
                            .indexOf(req.user.id);

                        // Splice out of array

                        post.eventAttendPeople.splice(removeIndex, 1);

                        // Save

                        post.save().then(post => res.json(post));

                    })
                    .catch(err => res.status(404).json({ postnotfound: 'Not post found'}));
            });
    });



module.exports = router;