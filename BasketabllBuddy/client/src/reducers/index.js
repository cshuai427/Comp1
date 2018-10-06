import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReduce from './errorReducer';
import profileReducer from './profileReducer';
import postReducer from './postReducer';
export default combineReducers({
    auth: authReducer,
    errors:errorReduce,
    profile: profileReducer,
    post: postReducer
});