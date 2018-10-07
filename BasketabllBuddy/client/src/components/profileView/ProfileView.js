import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import Spinner from '../common/Spinner';
import { getCurrentProfile } from '../../actions/profileActions';
import Profile from './Profile';

class ProfileView extends Component {

    constructor(){
        super();

    }

    componentDidMount()
    {
        this.props.getCurrentProfile();

    }


    render() {

        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;

        let profileBasic;
        let profileContent;

        if(profile === null || loading)
        {
            profileBasic = <Spinner />
        }
        else
        {
            // Check if logged in user has profile data
            if(Object.keys(profile).length > 0)
            {
                profileBasic = (
                    <div className="profileView">
                        <p className="lead text-muted">
                            Welcome{' '}
                            {/*<Link to={`{profile-view/${user.name}`}>{user.name}</Link>*/}
                        </p >
                        <Link to="/edit-profile" className="btn btn-light" >
                            <i className="fas fa-user-circle text-info mr-1" />
                            Edit Profile
                        </Link>
                        <Link to="/manage-post" className="btn btn-light" >
                            <i className="fas fa-user-circle text-info mr-1" />
                            Manage post
                        </Link>
                    </div>
                );

                profileContent = (
                    <div className="profileView">
                        <div className="row">
                            <div className="col-md-6">

                            </div>
                        </div>
                        <Profile profile={profile}/>
                    </div>
                );
            }
            else
            {
                // User is logged in has no profile
                profileBasic =
                    (
                        <div className="profileView">
                            <p className="lead text-muted">Welcome {user.name} </p >
                            <p>You have not yet setup a profile, please add some info</p >
                            <Link to="/create-profile" className="btn btn-lg btn-info">
                                create profile
                            </Link>
                        </div>
                    )
            }
        }

        return (
            <div className="profileView">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="dispaly-4">Profile</h1>
                            {profileBasic}
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {profileContent}
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}



ProfileView.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(ProfileView);