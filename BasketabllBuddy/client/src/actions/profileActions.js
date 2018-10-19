import axios from 'axios';
import {GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_ERRORS} from './types';

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
    axios.get(`/api/profile/nickname/${nickname}`)
        .then(res =>
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        }))
        .catch(err => (
            dispatch({
                type: GET_PROFILE,
                payload: null
            })
        ));
};


// Profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
};


// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};