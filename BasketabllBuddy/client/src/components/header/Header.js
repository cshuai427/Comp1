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
            <ul className = "navbar-nav ml-auto">
                <li className = "nav-item">
                    <Link className = "nav-link" to="/profile-view">
                        Profile
                    </Link>
                </li>
                <li className = "nav-item">
                    <Link to="" className = "nav-link" onClick={this.onLogoutClick.bind(this)}>
                        <img className="rounded-circle"
                             src={user.avatar}
                             style={{width:'25px',marginRight:'5px'}}
                             alt={user.name}
                             title={user.name}
                        />{' '}
                             Logout
                    </Link>
                </li>
            </ul>
        );
        const guestLinks = (
            <ul className = "navbar-nav ml-auto">
                <li className = "nav-item">
                    <Link className = "nav-link" to="/login">
                        Login
                    </Link>
                </li>
                <li className = "nav-item">
                    <Link className = "nav-link" to="/register">
                        Sign Up
                    </Link>
                </li>
            </ul>
        );
        return(
            <nav className = "navbar navbar-inverse navbar-expand-sm navbar-dark bg-primary mb-4">
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
                                <Link className = "nav-link" to = "/">
                                    Home
                                </Link>

                            </li>
                            <li className = "nav-item">
                                <Link className = "nav-link" to = "/posts">
                                    Post
                                </Link>
                            </li>

                            <li className = "nav-item">
                                <Link className = "nav-link" to = "/">
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