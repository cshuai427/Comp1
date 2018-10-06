import axios from 'axios';
import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_LOADING,
    CLEAR_CURRENT_PROFILE,
    GET_ERRORS,
    SET_CURRENT_USER,
    CLEAR_ERRORS
} from './types';

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
    axios
        .post('/api/profile', profileData)
        .then(res => {
            dispatch(clearErrors());
            history.push('/profile-view');
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }));

};

// Get current profile

export const getCurrentProfile = () => dispatch =>
{
    dispatch(setProfileLoading());
    axios.get('/api/profile')
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            }))
        .catch(err => (
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        ));
};


// Get profile by nickname

export const getProfileByNickname = (nickname) => dispatch =>
{
    dispatch(setProfileLoading());
    axios.get(`/api/profile/${nickname}`)
        .then(res =>
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        }))
        .catch(err => (
            dispatch({
                type: GET_PROFILES,
                payload: {}
            })
        ));
};


// Get Profiles

export const getProfiles = () => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get('/api/profile/all')
        .then(res =>
            dispatch({
                type: GET_PROFILES,
                payload: res.data
            }))
        .catch(err =>
            dispatch({
                type: GET_PROFILES,
                payload: null
            }));
};


// Profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
};

// Clear profile loading
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
};

// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};