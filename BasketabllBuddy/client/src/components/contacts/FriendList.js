import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profileActions';
import FriendItem from './FriendItem';
import Spinner from '../common/Spinner'

class FriendList extends Component {

    componentDidMount(){
        this.props.getProfiles();
    }

    render(){
        const { profiles, loading } = this.props.profile;
        const { user } = this.props.auth;


        let friendItems;

        if(profiles === null || loading) {
            friendItems = <Spinner />;
        }
        else
        {

            if(profiles.length > 0){
                friendItems = profiles.map(profile =>
                    (

                        // Remove login user from list
                        user.id !== profile.user._id
                            ? <FriendItem key={profile._id} profile={profile} />
                            : null

                    ))
            }
            else
            {
                friendItems = <h4>No profiles found...</h4>
            }
        }

        return(
            <div className="col-sm-2 col-auto sidenav bg-secondary">

                 <ul className="list-group list-group-flush">
                     <li className="list-group-item d-flex justify-content-between align-items-center">
                     <i className="fa fa-search"/>
                     <input type="text" className="bg-light"/>
                     </li>
                     {friendItems}
                 </ul>
            </div>
        );
    }

}

FriendList.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(FriendList);