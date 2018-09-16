import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReduce from './errorReducer';
import postReducer from './postReducer';
export default combineReducers({
    auth: authReducer,
    errors:errorReduce,
    post:postReducer
});
