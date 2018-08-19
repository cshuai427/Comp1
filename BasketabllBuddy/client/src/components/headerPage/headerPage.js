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
                <td width="20%">  Event  </td>
                <td width="20%">  Account  </td>
                </tr>
            </header>
        )

    }


}

export default HeaderPage;