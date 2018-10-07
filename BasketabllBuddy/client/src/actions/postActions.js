import axios from 'axios';

import {ADD_POST, GET_ERRORS, CLEAR_ERRORS, GET_POSTS, POST_LOADING, GET_POST, DELETE_POST} from "./types";

//Add post
export const addPost = (postData, history) => dispatch => {
    axios
        .post('/api/posts', postData)
        .then(res =>
        {
            // ?
            console.log(res.data);
            dispatch ({
                type: ADD_POST,
                payload: res.data
            });
            // should be to created post
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
    axios
        .delete(`/api/posts/${id}`)
        .then(res =>
            {
                dispatch({
                    type: DELETE_POST,
                    payload: id
                });
               url ? history.push(url) : null
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
export const getPosts = () => dispatch => {
    dispatch (setPostLoading());
    axios
        .get('/api/posts')
        .then(res =>
            dispatch ({
                type: GET_POSTS,
                payload: res.data
            })
        )
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

export const attendEvent = (id, newAttendUser) => dispatch => {
    axios
        .post(`/api/posts/attend/${id}`, newAttendUser)
        .then(res => dispatch(getPost(id)))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Remove Attend

export const removeAttendEvent = id => dispatch => {
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