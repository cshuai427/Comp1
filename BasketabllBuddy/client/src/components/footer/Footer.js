import React, {Component} from 'react';

class Footer extends Component {
    render(){
        return(
               <footer className= "container-fluid mt-5 p-4 text-center">
                   Copyright &copy; {new Date().getFullYear()} Basketball Buddy
               </footer>
        );


    }
}

export default Footer;
