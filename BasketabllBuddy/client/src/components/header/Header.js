import React, {Component} from 'react';
import logo from "../../Img/logo.png";
import {Link} from 'react-router-dom';

class Header extends Component{
    render()
    {
        return(
            <header>
        <ul>
        <li><img src = { logo } alt="logo" /></li>
        <li><a className="active" href="/">Home</a></li>
        <li><a href="/event/post">Event</a></li>
        <li><a href="">Account</a></li>
            <li><a href="/login">login</a></li>
            <li><a href="/register">Register</a></li>
        </ul>
            </header>
        )

    }


}

export default Header;