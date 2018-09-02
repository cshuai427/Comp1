import React, {Component} from 'react';
import logo from "../../Img/logo.png";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logoutUser} from "../../actions/authActions";
import PropTypes from 'prop-types';


class Header extends Component{
    onLogoutclick(e){
        e.preventDefault();

        this.props.logoutUser();
    }
    render()
    {
        const {isAuthenticated, user} =this.props.auth;
        const authLinks = ( <ul><li><a href="#" onClick={this.onLogoutclick.bind(this)}>
            <img className="rounded-circle" src={user.avatar} style={{width:'25px',marginRight:'5px'}} alt={user.name} title="email"/>{' '}Logout</a></li>
                   </ul>);
        const guestLinks = ( <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li></ul>);
        return(
            <header>
        <ul>
        <li><img src = { logo } alt="logo" /></li>
        <li><a className="active" href="/">Home</a></li>
        <li><Link to="/event/post">Event</Link></li>
        <li><a href="">Account</a></li>

            {isAuthenticated ? authLinks : guestLinks}

        </ul>
            </header>
        )

    }


}
Header.protoTypes={
    logoutUser:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired
}
const mapStateToProps=state=>({
    auth:state.auth,
    errors: state.errors
});
export default connect(mapStateToProps,{logoutUser})(Header);