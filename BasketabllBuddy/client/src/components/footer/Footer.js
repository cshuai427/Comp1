import React, {Component} from 'react';
//import Logo from '../../Img/logo.jpg';

class Footer extends Component {
    render(){
        return(
               <footer>
                   Copyright &copy; {new Date().getFullYear()} Basketball Buddy
               </footer>
        );


    }
}

export default Footer;
