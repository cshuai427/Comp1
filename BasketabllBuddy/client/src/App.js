import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthtoken from './unit/setAuthToken';
import {logoutUser, setCurrentUser} from './actions/authActions';
//style
import './App.css';


//import components
import Header from './components/header/Header';
import HomePageLeft from './components/account/Account';
import EventPage from './components/event/Event';
import HomePageRight from './components/contacts/FriendList';
import Footer from './components/footer/Footer';
import PostPage from './components/evenPost/Post';
import CommitPage from './components/evenPost/Comment';
import Login from './components/authorization/Login';
import Register from './components/authorization/Register';
import  {PropTypes} from 'prop-types';
import {connect} from 'react-redux';



//check for token
if(localStorage.jwtToken){
    setAuthtoken(localStorage.jwtToken);
    const decoded =jwt_decode(localStorage.jwtToken);

    store.dispatch(setCurrentUser(decoded));
    const currentTime =Date.now() /1000;

    if( decoded.exp<currentTime){
        store.dispatch(logoutUser());
        window.location.href='/login';
    }
}


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div>
                        <div className="App-header"><Header/></div>

                        <div className="App-left"><HomePageLeft/></div>

                        <div>
                            <Route exact path="/" component={EventPage}/>
                            <Route exact path="/event/post" component={PostPage}/>
                            <Route exact path="/event/commit" component={CommitPage}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/register" component={Register}/>


                        </div>

                        <div className="App-right"><HomePageRight/></div>

                        <div className="App-footer"><Footer/></div>

                    </div>
                </Router>
            </Provider>


        );

    }
}

export default App;
