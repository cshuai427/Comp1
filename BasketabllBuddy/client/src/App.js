import React, { Component } from 'react';
import  PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import jwt_decode from 'jwt-decode';
import setAuthtoken from './unit/setAuthToken';
import {logoutUser, setCurrentUser} from './actions/authActions';

import { Provider } from 'react-redux';
import store from './store';
import PrivateRoute from './components/common/PrivateRoute';

//import components
import Header from './components/header/Header';
import Account from './components/account/Account';
import Event from './components/event/Event';
import FriendList from './components/contacts/FriendList';
import Footer from './components/footer/Footer';
import PostPage from './components/posts/Posts';
import CommentPage from './components/posts/Comment';
import Login from './components/authorization/Login';
import Register from './components/authorization/Register';
import ProfileView from './components/profileView/ProfileView';
import CreateProfile from './components/profileView/CreateProfile';
import EditProfile from './components/profileView/EditProfile';
import News from './components/news/News';
import NotFound from './components/Not-Found/NotFound';

// import './App.css';



//check for token
if(localStorage.jwtToken){

    // Set auth token header auth
    setAuthtoken(localStorage.jwtToken);

    // Decode token and get user information and experience
    const decoded =jwt_decode(localStorage.jwtToken);

    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    // Check for expired token
    const currentTime =Date.now() /1000;

    if( decoded.exp<currentTime){

        // Logout user
        store.dispatch(logoutUser());

        // Clear current Profile * need to be done
        window.location.href='/login';
    }
}


class App extends Component {
    render() {
        return (

            <Provider store={store}>
                <Router>
                    <div className="App">

                        <Header/>

                        <div className="container-fluid text-center">
                            <div className="row content">
                                <Account/>

                                    <div className="container col-sm-8 col-auto">
                                    <Switch>
                                        <Route exact path="/" component={Event}/>

                                        <Route exact path="/login" component={Login}/>

                                        <Route exact path="/register" component={Register}/>

                                        <Route exact path="/news" component={News}/>

                                        <PrivateRoute exact path = { '/profile-view' } component = {ProfileView} />

                                        <PrivateRoute exact path = { '/create-profile' } component = {CreateProfile} />

                                        <PrivateRoute exact path = { '/edit-profile' } component = {EditProfile} />

                                        <PrivateRoute exact path="/posts" component={PostPage}/>

                                        <PrivateRoute exact path="/event/commit" component={CommentPage}/>

                                        <Route component={NotFound}/>
                                    </Switch>

                                        </div>
                                    <FriendList/>
                                </div>
                            </div>

                        <div className="App-footer"><Footer/></div>

                    </div>
                </Router>
            </Provider>


    );

    }
}

export default App;