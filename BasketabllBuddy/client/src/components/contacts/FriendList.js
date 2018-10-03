
import React, { Component } from 'react';

class FriendList extends Component {

    render(){
        return(
            <div className="col-sm-2 col-auto sidenav bg-secondary">
                 <h2>Online Chat</h2>
                <p><img src="/" alt="avatar"/> Tom 123</p>
                <p><img src="/" alt="avatar"/> Peter 456</p>
                <p><img src="/" alt="avatar"/> Taylor</p>
            </div>
        );
    }

}
export default FriendList;