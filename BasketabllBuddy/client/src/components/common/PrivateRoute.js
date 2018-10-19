import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


// Private route for checking whether the user is authenticated. This will be used for all private route.
const PrivateRoute = ({component: Component, auth, ...rest}) =>
    (
        <Route
            {...rest}
            render = {props =>
                auth.isAuthenticated === true ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login"/>
                )
            }
        />
    );

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state =>
    (
        {
            auth: state.auth
        }
    );

export default connect(mapStateToProps)(PrivateRoute);