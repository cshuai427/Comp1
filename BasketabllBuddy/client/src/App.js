import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import jwt_decode from 'jwt-decode';
import setAuthtoken from './unit/setAuthToken';
import {logoutUser, setCurrentUser} from './actions/authActions';

import {Provider} from 'react-redux';
import store from './store';
import PrivateRoute from './components/common/PrivateRoute';

//import components
import Header from './components/header/Header';
import HomePageLeft from './components/account/Account';
import EventPage from './components/event/Event';
import FriendList from './components/contacts/FriendList';
import Footer from './components/footer/Footer';
import PostPage from './components/posts/Posts';
import CommentPage from './components/posts/Comment';
import Login from './components/authorization/Login';
import Register from './components/authorization/Register';
import  {PropTypes} from 'prop-types';

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
                                <HomePageLeft/>

                                <div className="container col-sm-8 col-auto">
                                    <Route exact path="/" component={EventPage}/>
                                    <Route exact path="/login" component={Login}/>
                                    <Route exact path="/register" component={Register}/>

                                    <Switch>
                                        <PrivateRoute exact path="/posts" component={PostPage}/>
                                    </Switch>

                                    <Switch>
                                        <PrivateRoute exact path="/event/commit" component={CommentPage}/>
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
