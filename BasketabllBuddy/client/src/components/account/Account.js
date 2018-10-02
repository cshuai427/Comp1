import React, { Component } from 'react';

class Account extends Component {

    render(){
        return(
            <div className="col-sm-2 col-auto sidenav">
                    <h3>My account</h3>
                    <img width="100" height="200" alt="avatar"/>
                    <h3>Username123</h3>
                    <h3>Post 20</h3>
                    <h3>Friend 10</h3>
                    <a  href="/">Edit</a>
            </div>



        );
    }

}
export default Account;