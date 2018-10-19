import axios from 'axios';

import {ADD_POST, GET_ERRORS, CLEAR_ERRORS, GET_POSTS, POST_LOADING, GET_POST, DELETE_POST} from "./types";

//Add post
export const addPost = (postData, history) => dispatch => {
    // send new post data to backend api and store response to redux
    // then redirect to detail page of created post
    axios
        .post('/api/posts', postData)
        .then(res =>
        {
            dispatch ({
                type: ADD_POST,
                payload: res.data
            });
            history.push(`/post/${res.data._id}`);
        })
        .catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
        );
};


//delete post
export const deletePost = (id, history, url) => dispatch => {
    // delete a post by post id
    // redirect to url
    axios
        .delete(`/api/posts/${id}`)
        .then(res =>
            {
                dispatch({
                    type: DELETE_POST,
                    payload: id
                });
                if(url){
                    history.push(url);
                }
                else
                {
                   return null
                }
            }

        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

//Get posts
export const getPosts = page => dispatch => {
    dispatch (setPostLoading());
    // get all posts that will be displayed on a certain page and store data in redux
    axios
        .get(`/api/posts/page/${page}`)
        .then(res => {
            dispatch({
                type: GET_POSTS,
                payload: res.data
            })
        })
        .catch(err =>
            dispatch({
                type: GET_POSTS,
                payload: null
            })
        );
};

//Get post
export const getPost = id => dispatch => {
    dispatch (setPostLoading());
    // get one post by post id and store data in redux
    axios
        .get(`/api/posts/${id}`)
        .then(res =>
            dispatch ({
                type: GET_POST,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_POST,
                payload: null
            })
        );
};

// Add Like
export const addLike = id => dispatch => {
    // find a post by id and store user data in like list of that post
    axios
        .post(`/api/posts/like/${id}`)
        .then(res => dispatch(getPost(id)))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};
// Remove Like
export const removeLike = id => dispatch => {
    // find a post by id and remove a user from the like list
    axios
        .post(`/api/posts/unlike/${id}`)
        .then(res => dispatch(getPost(id)))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};
// Add Comment
export const addComment = (postId, commentData) => dispatch => {
    dispatch(clearErrors());
    // send value to back-end
    // find a post by id and add new comment under that post
    // then retrieve data from backend and store in redux
    axios
        .post(`/api/posts/comment/${postId}`, commentData)
        .then(res =>
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Delete Comment

export const deleteComment = (postId, commentId) => dispatch =>{
    // send value to back-end
    // find a post by id and remove a comment under that post
    // then retrieve data from backend and store in redux
    axios
        .delete(`/api/posts/comment/${postId}/${commentId}`)
        .then(res =>
            {
                dispatch({
                    type: GET_POST,
                    payload: res.data
                });
            })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }));
};

// Attend Event

export const attendEvent = (postId, newAttendUser) => dispatch => {
    // find a post by id and store user data in the attendance list
    axios
        .post(`/api/posts/attend/${postId}`, newAttendUser)
        .then(res => dispatch(getPost(postId)))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Remove Attend

export const removeAttendEvent = id => dispatch => {
    // find a post by id and remove user data from the attendance list
    axios
        .post(`/api/posts/unattend/${id}`)
        .then(res => dispatch(getPost(id)))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};


// set loading state
export const setPostLoading = () => {
    return {
        type: POST_LOADING
    }
};
// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};
