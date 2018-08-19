import React, { Component } from 'react';

class HomeAccountPage extends Component {

    render(){
        return(
            <div className="App-left">
                    <h3>My account</h3>
                    <img width="100" height="50" alt="avatar"/>
                    <h3>Username123</h3>
                    <h3>Post 20</h3>
                    <h3>Friend 10</h3>
                    <a  href="/">Edit</a>
            </div>



        );
    }

}
export default HomeAccountPage;