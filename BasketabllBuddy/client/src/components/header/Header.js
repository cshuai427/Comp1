import React, {Component} from 'react';
import logo from "../../Img/logo.png";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logoutUser} from "../../actions/authActions";
import PropTypes from 'prop-types';

class Header extends Component{

    onLogoutClick(e){

        e.preventDefault();

        this.props.logoutUser();
    }

    render()
    {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <ul className = "navbar-nav ml-auto sm-auto xs-auto lg-auto">

                <li className = "nav-item">
                    <Link className = "nav-link navlinks" to="/profile-view">
                        <img className="rounded-circle"
                             src={user.avatar}
                             style={{width:'28px',marginRight:'5px'}}
                             alt={user.name}
                             title={user.name}
                        />{' '}
                        Profile
                    </Link>
                </li>
                <li className = "nav-item">
                    <Link className = "nav-link navlinks" to = "/post">
                        Post
                    </Link>
                </li>
                <li className = "nav-item" >
                    <Link to="" className = "nav-link navlinks" onClick={this.onLogoutClick.bind(this)}>
                        <i className="fa fa-sign-out-alt" />Logout
                    </Link>
                </li>
            </ul>
        );
        const guestLinks = (
            <ul className = "navbar-nav ml-auto">
                <li className = "nav-item">
                    <Link className = "nav-link navlinks" to="/login">
                        <i className="fa fa-sign-in-alt" />{' '}
                        Login
                    </Link>
                </li>
                <li className = "nav-item">

                    <Link className = "nav-link navlinks" to="/register">
                        <i className="fa fa-user" />{' '}
                        Sign Up
                    </Link>
                </li>
            </ul>
        );

        return(
            <nav className = "navbar navbar-expand-sm " style={{backgroundColor: '#ffffff'}}>
                <div className="container">
                    <Link to="/" className = "navbar-brand">
                        <img src = { logo } alt="logo" />
                    </Link>
                    <button className = "navbar-toggler"
                            type = "button"
                            data-toggle = "collapse"
                            data-target = "#mobile-nav">
                        <span className = "navbar-toggler-icon" />
                    </button>

                    <div className = "collapse navbar-collapse" id = "mobile-nav">
                        <ul className = "navbar-nav mr-auto">
                            <li className = "nav-item">
                                <Link className = "nav-link navlinks" to = "/news">
                                    News
                                </Link>

                            </li>
                            <li className = "nav-item">
                                <Link className = "nav-link navlinks" to = "/">
                                    Event
                                </Link>
                            </li>
                        </ul>

                        {isAuthenticated ? authLinks : guestLinks}
                    </div>
                </div>
            </nav>
        )

    }


}
Header.protoTypes={
    logoutUser: PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired
};

const mapStateToProps=state=>({
    auth: state.auth,
    errors: state.errors
});
export default connect(mapStateToProps, { logoutUser })(Header);