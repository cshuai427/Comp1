import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../../actions/profileActions';

class Account extends Component {

    componentDidMount(){
        this.props.getCurrentProfile();
    }

    render(){

        const { user } = this.props.auth;

        const { profile } = this.props.profile;
        return(
            <div className="col-sm-2 col-auto sidenav bg-secondary">
                    <h3>My account</h3>
                    <img className="rounded-circle"
                         src={user.avatar}
                         style={{width:'100px',marginRight:'5px'}}
                         alt={user.name}
                         title={user.name}
                    />

                    <h3>{user.name}</h3>
                    <h3>Post: {}</h3>
                    <h3>Friend: {user.friendList === null ? Object.keys(user.friendList).length : '0'}</h3>
                    <a  href="/profile-view">Edit</a>
            </div>



        );
    }

}

Account.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired

};

const mapStateToProps = state =>({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Account);