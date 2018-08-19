import React, {Component} from 'react';
import "../../Img/logo.jpg"

class HeaderPage extends Component{
    render()
    {
        return(
            <tr>
                <img src = "../../Img/logo.jpg" alt="logo" />
                <td>Home</td>
                <td>Event</td>
                <td>Account</td>
            </tr>
        )

    }


}

export default HeaderPage;