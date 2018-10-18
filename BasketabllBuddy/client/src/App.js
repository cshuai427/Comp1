import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import jwt_decode from 'jwt-decode';
import setAuthtoken from './utils/setAuthToken';
import {logoutUser, setCurrentUser} from './actions/authActions';

import { Provider } from 'react-redux';
import store from './store';
import PrivateRoute from './components/common/PrivateRoute';

//import components
import Header from './components/header/Header';
import Event from './components/event/Event';
import Footer from './components/footer/Footer';
import PostForm from './components/posts/PostForm';
import Login from './components/authorization/Login';
import Register from './components/authorization/Register';
import ProfileView from './components/profileView/ProfileView';
import CreateProfile from './components/profileView/CreateProfile';
import EditProfile from './components/profileView/EditProfile';
import Post from './components/post/Post';
import NotFound from './components/Not-Found/NotFound';
import ManagePost from './components/manageEvent/ManagePost';
import GuestView from './components/profileView/GuestView';

import './App.css';
import Redirect from "react-router-dom/es/Redirect";

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
                        <div className="header">
                            <Header/>
                        </div>

                        <div className="container-fluid text-center">
                            {/*<div className="row content">*/}
                                {/*<PrivateRoute component={Account}/>*/}

                                <div className="container-fluid text-center col-sm-12 col-lg-12 col-md-12 col-xs-12 col-auto nopadding" style={{backgroundColor:'#DCDCDC'}} >
                                    <Switch>
                                        {/* force redirect homepage to /event/1 */}
                                        <Route
                                            exact
                                            path="/"
                                            render={ () => ( <Redirect to="/event/1" /> )}
                                        />

                                        <Route path="/event/:page"
                                               render = { props => (
                                                <Event
                                                    {...props.match.params}
                                                    key={props.match.params.page}
                                                />)}
                                        />

                                        <Route exact path="/login" component={Login}/>
                                        <Route exact path="/register" component={Register}/>
                                        <Route exact path="/post/:id" component={Post}/>

                                        <PrivateRoute exact path = { '/profile-view' } component = {ProfileView} />
                                        <PrivateRoute exact path = { '/create-profile' } component = {CreateProfile} />
                                        <PrivateRoute exact path = { '/edit-profile' } component = {EditProfile} />
                                        <PrivateRoute exact path="/post" component={PostForm}/>
                                        <PrivateRoute exact path = { '/manage-post' } component = {ManagePost} />
                                        <PrivateRoute exact path = { '/profile/nickname/:nickName' } component = {GuestView} />
                                        <Route component={NotFound}/>
                                    </Switch>
                                </div>

                                {/*<PrivateRoute component={FriendList} />*/}
                                {/*</div>*/}
                                </div>
                        <div className="App-footer"><Footer/></div>
                    </div>
                </Router>
            </Provider>
      );
    }
}

export default App;
