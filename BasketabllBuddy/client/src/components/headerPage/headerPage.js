import React, {Component} from 'react';
import Logo from '../../Img/logo.jpg';

class HeaderPage extends Component{
    render()
    {
        return(
            <header>
                <tr>
                    <td><img src={Logo} width='180px' height='50px'/></td>
                <td width="20%">  Home  </td>
                    <td width="20%">  <a href="/event/post">Event</a>  </td>
                <td width="20%">  Account  </td>
                </tr>
            </header>
        )

    }


}

export default HeaderPage;