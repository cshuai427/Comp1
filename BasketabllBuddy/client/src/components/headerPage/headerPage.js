import React, {Component} from 'react';
import logo from "../../Img/logo.png";

class HeaderPage extends Component{
    render()
    {
        return(
            <header>
        <ul>
        <li><img src = { logo } alt="logo" /></li>
        <li><a class="active" href="#home">Home</a></li>
        <li><a href="">Event</a></li>
        <li><a href="">Account</a></li>
        </ul>
            </header>
        )

    }


}

export default HeaderPage;