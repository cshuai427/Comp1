import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProfileByNickname } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';
import Spinner from '../common/Spinner';

class GuestView extends Component {


    componentDidMount(){

        if(this.props.match.params.nickName)
            // Get the value from url
        this.props.getProfileByNickname(this.props.match.params.nickName);
    }

    componentWillReceiveProps(nextProps)
    {

        // This is check the user data status
        // if it is null, page will redirect to not found
        if(nextProps.profile.profile === null && this.props.profile.loading) {
            this.props.history.push('/not-found');
        }
    }

    render() {

        const { profile, loading } = this.props.profile;

        // Check profile state from redux is not null
        // If it null, this component will invoke loading page until receive data
        if(profile === null || loading ) {
            return <Spinner />
        } else {

            if(isEmpty(profile.nickName) || isEmpty(profile.user))
                return  <Redirect to='/not-found' />;
        }


        // Interested List and render each of it

        const interests = profile.interests.map((interest, index) =>
            (
                interest !== "" ?
                    <div key={index} className="p-3">
                        <i className="fa fa-heart" />
                        {' '}<span className="badge badge-primary badge-pill">{interest}</span>
                    </div>: null));

        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="card card-body bg-info text-white mb-3">
                        <div className="row">
                            <div className="col-4 col-md-4 m-auto">
                                < img src={profile.user.avatar} alt="" className="rounded-circle" />
                            </div>
                        </div>
                        <div className="text-center">
                            <h1 className="display-4 text-center">
                                {profile.nickName}
                            </h1>
                            <p className="lead text-center">

                                {isEmpty(profile.social && profile.social.twitter) ? null: (
                                    <a
                                        href= {profile.social.twitter.toString().includes('http://')
                                            || profile.social.twitter.toString().includes('https://')
                                            ? profile.social.twitter
                                            : 'http://' + profile.social.twitter}
                                        target="_blank"
                                        className="text-white p-2"
                                        name="twitter"
                                    >
                                        <i className="fab fa-twitter fa-2x" />
                                    </a >
                                )}

                                {isEmpty(profile.social && profile.social.facebook) ? null: (
                                    <a href= {profile.social.facebook.toString().includes('http://')
                                        || profile.social.facebook.toString().includes('https://')
                                        ? profile.social.facebook
                                        : 'http://' + profile.social.facebook}
                                       target="_blank"
                                       className="text-white p-2"
                                       name="facebook"
                                    >
                                        <i className="fab fa-facebook fa-2x" />
                                    </a >
                                )}

                                {isEmpty(profile.social && profile.social.youtube) ? null: (
                                    <a href= {profile.social.youtube.toString().includes('http://')
                                        || profile.social.youtube.toString().includes('https://')
                                        ? profile.social.youtube
                                        : 'http://' + profile.social.youtube}
                                       target="_blank"
                                       className="text-white p-2"
                                       name="youtube"
                                    >
                                        <i className="fab fa-youtube fa-2x" />
                                    </a >
                                )}

                                {isEmpty(profile.social && profile.social.instagram) ? null: (
                                    <a href= {profile.social.instagram.toString().includes('http://')
                                        || profile.social.instagram.toString().includes('https://')
                                        ? profile.social.instagram
                                        : 'http://' + profile.social.instagram}
                                       target="_blank"
                                       className="text-white p-2"
                                       name="instagram"
                                    >
                                        <i className="fab fa-instagram fa-2x" />
                                    </a >
                                )}

                                {isEmpty(profile.social && profile.social.linkedin) ? null: (
                                    <a href= {profile.social.linkedin.toString().includes('http://')
                                        || profile.social.linkedin.toString().includes('https://')
                                        ? profile.social.linkedin
                                        : 'http://' + profile.social.linkedin}
                                       target="_blank"
                                       className="text-white p-2"
                                       name="linkedin"
                                    >
                                        <i className="fab fa-linkedin fa-2x" />
                                    </a >
                                )}
                            </p >
                        </div>
                    </div>
                </div>


                <div className="col-md-12">
                    <div className="card card-body bg-light mb-3">
                        <h3 className="text-center text-info">About Me</h3>
                        <p className="lead">{isEmpty(profile.aboutMe)
                            ? <span> {profile.nickName} does not have a aboutMe</span>
                            : <span>{profile.aboutMe}</span>}
                        </p >
                        <hr/>
                        <h3 className="text-center text-info">Interested Field</h3>
                        <div className="d-flex flex-wrap justify-content-center align-items-center">
                            {interests}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

GuestView.propTypes = {
    getProfileByNickname: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,

};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});



export default connect(mapStateToProps, { getProfileByNickname })(GuestView);