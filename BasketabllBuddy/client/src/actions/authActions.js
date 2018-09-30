import{GET_ERRORS,SET_CURRENT_USER} from "./types";
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../unit/setAuthToken';
//Register user
export const registerUser =(userData,history)=> dispatch=>{
   // Use axios to connect api
    axios.post('/api/users/register', userData)
        .then(res =>history.push('/login') )
        .catch(err =>
         dispatch({
             type: GET_ERRORS,
             payload: err.response.data
         }
        ));

};
export const loginUser=userData=>dispatch=>{
    axios.post('/api/users/login',userData)
    .then(res=>{
//save to storeage
        const {token}=res.data;
        localStorage.setItem('jwtToken',token);
        setAuthToken(token);
        const decoded =jwt_decode(token);
        dispatch(setCurrentUser(decoded));

    })
        .catch(err=>
            dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
        );
};


export const setCurrentUser =(decoded)=>{
    return{
        type:SET_CURRENT_USER,
        payload:decoded
    }
};
export const logoutUser =() =>dispatch=>{
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
};