import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';


//style
import './App.css';

//import components
import Header from "./components/header/Header";
import HomePageLeft from "./components/account/Account";
import Event from "./components/event/Event";
import HomePageRight from "./components/contacts/FriendList";
import Footer from "./components/footer/Footer";
import Post from "./components/evenPost/Post";
import Comment from "./components/evenPost/Comment";
import Login from './components/authorization/Login';
import Register from './components/authorization/Register';


class App extends Component {
  render() {
    return (
        <Router>
        <div>
            <div className="App-header"> <Header /></div>

            <div className="App-left"> <HomePageLeft /> </div>

            <div>
                <Route exact path="/" component={Event}/>
                <Route exact path="/event/post" component={Post}/>
                <Route exact path="/event/commit" component={Comment}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>


            </div>
            <div className="App-right"> <HomePageRight /> </div>

            <div className="App-footer"> <Footer /> </div>

        </div>
        </Router>

    );





      /*<div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    */

  }
}

export default App;
