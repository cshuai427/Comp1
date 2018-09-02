import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReduce from './errorReducer';
export default combineReducers({
    auth: authReducer,
    errors:errorReduce
});
