import React, {Component} from 'react';
import logo from "../../Img/logo.png";

class HeaderPage extends Component{
    render()
    {
        return(
            <header>
        <ul>
        <li><img src = { logo } alt="logo" /></li>
        <li><a className="active" href="/">Home</a></li>
        <li><a href="/event/post">Event</a></li>
        <li><a href="">Account</a></li>
        </ul>
            </header>
        )

    }


}

export default HeaderPage;