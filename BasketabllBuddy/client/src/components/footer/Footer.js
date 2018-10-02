import React, {Component} from 'react';
//import Logo from '../../Img/logo.jpg';

class Footer extends Component {
    render(){
        return(
               <footer className= "container-fluid bg-dark text-white mt-5 p-4 text-center">
                   Copyright &copy; {new Date().getFullYear()} Basketball Buddy
               </footer>
        );


    }
}

export default Footer;
