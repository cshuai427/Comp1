import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';


//style
import './App.css';

//import components
import HeaderPage from "./components/headerPage/headerPage";
import HomePageLeft from "./components/accountPage/homeAccountPage";
import HomeEventPage from "./components/eventPage/homeEventPage";
import HomePageRight from "./components/contactsPage/homeFriendList";
import FooterPage from "./components/footerPage/footerPage";
import EventPostPage from "./components/evenPostPage/eventPostPage";
import EventCommitPage from "./components/evenPostPage/eventCommitPage";


class App extends Component {
  render() {
    return (
        <Router>
        <div>
            <div className="App-header"> <HeaderPage /></div>

            <div className="App-left"> <HomePageLeft /> </div>

            <div>
                <Route exact path="/" component={HomeEventPage}/>
                <Route exact path="/event/post" component={EventPostPage}/>
                <Route exact path="/event/commit" component={EventCommitPage}/>
            </div>
            <div className="App-right"> <HomePageRight /> </div>

            <div className="App-footer"> <FooterPage /> </div>

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
