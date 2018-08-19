import React, { Component } from 'react';
import './App.css';
import HeaderPage from "./components/headerPage/headerPage";
import HomePageLeft from "./components/accountPage/homeAccountPage";
import HomeEventPage from "./components/eventPage/homeEventPage";
import HomePageRight from "./components/contactsPage/homeFriendList";
import FooterPage from "./components/footerPage/footerPage";

class App extends Component {
  render() {
    return (
        <div>
            <div className="App-header"> <HeaderPage /></div>
            <div className="App-left"> <HomePageLeft /> </div>
            <div className="App-middle"> <HomeEventPage/> </div>
            <div className="App-right"> <HomePageRight /> </div>
            <div className="App-footer"> <FooterPage /> </div>

        </div>

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
