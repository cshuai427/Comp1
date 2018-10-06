import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link, withRouter, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';
import Spinner from '../common/Spinner';

class EditProfile extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            displaySocialInputs: false,
            nickName: '',
            playerRole: '',
            interests: '',
            aboutMe: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }


    componentDidMount(){


        this.props.getCurrentProfile();
        console.log(this.props.profile)

    }

    componentWillReceiveProps(nextProps)
    {

        if(this.props.profile.profile)
        {
            const profile = this.props.profile.profile;

            // Bring interests array back to CSV
            const interestsCSV = profile.interests.join(',');

            // If profile field doesn't exist, make empty string
            profile.nickName = !isEmpty(profile.nickName) ? profile.nickName : '';
            profile.aboutMe = !isEmpty(profile.aboutMe) ? profile.aboutMe : '';
            profile.social = !isEmpty(profile.social) ? profile.social : {};
            profile.social.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
            profile.social.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : '';
            profile.social.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : '';
            profile.social.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : '';
            profile.social.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';

            // Set component fields state
            this.setState({
                nickName: profile.nickName,
                playerRole: profile.playerRole,
                interests: interestsCSV,
                aboutMe: profile.aboutMe,
                twitter: profile.social.twitter,
                facebook: profile.social.facebook,
                linkedin: profile.social.linkedin,
                youtube: profile.social.youtube,
                instagram: profile.social.instagram,
            });
        }
    }

    onSubmit(e)
    {
        e.preventDefault();

        const profileData = {
            nickName: this.state.nickName,
            playerRole: this.state.playerRole,
            interests: this.state.interests,
            aboutMe: this.state.aboutMe,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram
        };

        this.props.createProfile(profileData, this.props.history);
    }

    onChange(e)
    {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        const { profile, loading } = this.props.profile;
        const { displaySocialInputs } = this.state;

        if(isEmpty(profile) || loading )
        {
            return <Spinner />
        }
        else
        {
            if(isEmpty(profile.nickName))
                return  <Redirect to='/create-profile' />
        }



        let socialInputs;

        if(displaySocialInputs)
        {
            socialInputs = (
                <div>
                    <InputGroup
                        placeholder="Twitter Profile URL"
                        onChange={this.onChange}
                        icon="fab fa-twitter"
                        name="twitter"
                        value={this.state.twitter}
                        error={this.props.errors.twitter}
                    />

                    <InputGroup
                        placeholder="Facebook Profile URL"
                        onChange={this.onChange}
                        icon="fab fa-facebook"
                        name="facebook"
                        value={this.state.facebook}
                        error={this.props.errors.facebook}
                    />

                    <InputGroup
                        placeholder="Linkedin Profile URL"
                        onChange={this.onChange}
                        icon="fab fa-linkedin"
                        name="linkedin"
                        value={this.state.linkedin}
                        error={this.props.errors.linkedin}
                    />

                    <InputGroup
                        placeholder="Youtube Profile URL"
                        onChange={this.onChange}
                        icon="fab fa-youtube"
                        name="youtube"
                        value={this.state.youtube}
                        error={this.props.errors.youtube}
                    />

                    <InputGroup
                        placeholder="Instagram Profile URL"
                        onChange={this.onChange}
                        icon="fab fa-instagram"
                        name="instagram"
                        value={this.state.instagram}
                        error={this.props.errors.instagram}
                    />
                </div>
            )
        }

        // Select options for playerRole
        const options = [
            { label: '* Select Player Role', value: '0'},
            { label: 'New Player',value: 'New Player' },
            { label: 'Center',value: 'Center' },
            { label: 'Forward',value: 'Forward' },
            { label: 'Power Forward',value: 'Power Forward' },
            { label: 'Small Forward',value: 'Small Forward' },
            { label: 'Guard',value: 'Guard' },
            { label: 'Shooting Guard',value: 'Shooting Guard' },
            { label: 'Point Guard',value: 'Point Guard' },
            { label: 'Team Coach',value: 'Team Coach' },
            { label: 'Scout',value: 'Scout' },
            { label: 'Other',value: 'Other' }
        ];
        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="align-baseline">
                            <Link to='/profile-view' className="btn btn-light">
                                Go Back
                            </Link>
                        </div>
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Edit Your Profile</h1>
                            <p className="lead text-center">
                                Let's get some information to make your profile stand out
                            </p >
                            <small className="d-block pb-3">* = required fields</small>

                            <form onSubmit={this.onSubmit}>

                                <TextFieldGroup
                                    placeholder="* Profile Nickname"
                                    name="nickName"
                                    value={this.state.nickName}
                                    onChange={this.onChange}
                                    disabled={true}
                                />

                                <SelectListGroup
                                    placeholder="Player Role"
                                    name="playerRole"
                                    value={this.state.playerRole}
                                    onChange={this.onChange}
                                    options={options}
                                    error={this.props.errors.playerRole}
                                    info="Give us an idea of your basketball aspect"
                                />

                                <TextFieldGroup
                                    placeholder="Interests"
                                    name="interests"
                                    value={this.state.interests}
                                    onChange={this.onChange}
                                    error={this.props.errors.interests}
                                    info="Please use comma separated your interested filed of basketball"
                                />


                                <TextAreaFieldGroup
                                    placeholder="Short description"
                                    name="aboutMe"
                                    value={this.state.aboutMe}
                                    onChange={this.onChange}
                                    error={this.props.errors.aboutMe}
                                    info="Tell us a little about yourself"
                                />

                                <div className="mb-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            this.setState(prevState => ({
                                                displaySocialInputs: !prevState.displaySocialInputs
                                            }))
                                        }} className="btn btn-primary">
                                        Add Social Networks Links
                                    </button>
                                    <span className="text-muted">Optional</span>
                                </div>
                                {socialInputs}
                                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};


const mapStateToProps= state => ({
    profile: state.profile,
    errors: state.errors

});
export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));