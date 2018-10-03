import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import Spinner from '../common/Spinner';
import { getCurrentProfile } from '../../actions/profileActions';
import EditProfile from './EditProfile';

class ProfileView extends Component {

    constructor(){
        super();
        this.state = {
            displayProfile: false,
        };
    }

    componentDidMount()
    {
        this.props.getCurrentProfile();
    }


    render() {

        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;
        const { displayProfile } = this.state;

        let displayProfileContent;
        if(displayProfile && this.props)
        {
            displayProfileContent = <EditProfile />
        }

        let profileDetail;

        if(profile === null || loading)
        {
            profileDetail = <Spinner />
        }
        else
        {
            // Check if logged in user has profile data
            if(Object.keys(profile).length > 0)
            {
                profileDetail = (
                    <div>
                        <p className="lead text-muted">
                            Welcome
                            <Link to={`{profile-view/${user.name}`}>{user.name}</Link>
                        </p >
                        <div className="btn-group mb-4" role="group">

                            <button
                                type="button"

                                onClick={() => {
                                    this.setState(prevState => ({
                                        displayProfile: !prevState.displayProfile
                                    }))
                                }} className="btn btn-light">

                                <i className="fas fa-user-circle text-info mr-1" />
                                Profile
                            </button>
                        </div>
                        {displayProfileContent}
                    </div>
                )
            }
            else
            {
                // User is logged in has no profile
                profileDetail =
                    (
                        <div>
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
                <div className="contarer">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="dispaly-4">Profile</h1>
                            {profileDetail}
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