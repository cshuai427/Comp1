import React, {Component} from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

class Profile extends Component {

    render() {

        const { profile } = this.props;

        // Interested List

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
                                < img src={profile.user.avatar} alt="" className="rounded-circle"/>
                            </div>
                        </div>
                        <div className="text-center">
                            <h1 className="display-4 text-center">
                                {profile.nickName}
                            </h1>
                            <p className="lead text-center">

                                {isEmpty(profile.social && profile.social.twitter) ? null: (
                                    <a href= "_blank" className="text-white p-2">
                                        <i className="fab fa-twitter fa-2x" />
                                    </a >
                                )}

                                {isEmpty(profile.social && profile.social.facebook) ? null: (
                                    <a href={profile.social.facebook} target="_blank" className="text-white p-2">
                                        <i className="fab fa-facebook fa-2x" />
                                    </a >
                                )}

                                {isEmpty(profile.social && profile.social.youtube) ? null: (
                                    <a href={profile.social.youtube} target="_blank" className="text-white p-2">
                                        <i className="fab fa-youtube fa-2x" />
                                    </a >
                                )}

                                {isEmpty(profile.social && profile.social.instagram) ? null: (
                                    <a href={profile.social.instagram} target="_blank" className="text-white p-2">
                                        <i className="fab fa-instagram fa-2x" />
                                    </a >
                                )}

                                {isEmpty(profile.social && profile.social.linkedin) ? null: (
                                    <a href={profile.social.linkedin} target="_blank" className="text-white p-2">
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
                        <h3 className="text-center text-info">Interestint Field</h3>
                        <div className="d-flex flex-wrap justify-content-center align-items-center">
                            {interests}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Profile.propTypes = {
    profile: PropTypes.object.isRequired
};

export default Profile;