import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReduce from './errorReducer';
import profileReducer from './profileReducer';
export default combineReducers({
    auth: authReducer,
    errors:errorReduce,
    profile: profileReducer
});