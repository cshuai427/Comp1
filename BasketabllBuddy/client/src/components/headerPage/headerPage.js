import React, {Component} from 'react';
import "../../Img/logo.jpg"

class HeaderPage extends Component{
    render()
    {
        return(
            <header>
                <tr>
                    <td><img src = "../../Img/logo.jpg" alt="logo" /></td>
                <td>Home</td>
                <td>Event</td>
                <td>Account</td>
                </tr>
            </header>
        )

    }


}

export default HeaderPage;