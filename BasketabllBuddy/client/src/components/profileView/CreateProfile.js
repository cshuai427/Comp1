import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect, } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import isEmpty from '../../validation/is-empty';


class CreateProfile extends Component {
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
            instagram: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    componentDidMount()
    {
        this.props.getCurrentProfile();
    }


    componentWillReceiveProps(nextProps)
    {
        if(nextProps.errors)
        {
            this.setState({errors: nextProps.errors})
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

        if(profile === null || loading)
        {
            return <Spinner/>;
        }
        else
        {
            if(!isEmpty(profile.nickName))
            {
                return <Redirect to='/edit-profile'/>
            }
        }

        console.log(profile);

        const { errors, displaySocialInputs } = this.state;

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
                        error={errors.twitter}
                    />

                    <InputGroup
                        placeholder="Facebook Profile URL"
                        onChange={this.onChange}
                        icon="fab fa-facebook"
                        name="facebook"
                        value={this.state.facebook}
                        error={errors.facebook}
                    />

                    <InputGroup
                        placeholder="Linkedin Profile URL"
                        onChange={this.onChange}
                        icon="fab fa-linkedin"
                        name="linkedin"
                        value={this.state.linkedin}
                        error={errors.linkedin}
                    />

                    <InputGroup
                        placeholder="Youtube Profile URL"
                        onChange={this.onChange}
                        icon="fab fa-youtube"
                        name="youtube"
                        value={this.state.youtube}
                        error={errors.youtube}
                    />

                    <InputGroup
                        placeholder="Instagram Profile URL"
                        onChange={this.onChange}
                        icon="fab fa-instagram"
                        name="instagram"
                        value={this.state.instagram}
                        error={errors.instagram}
                    />
                </div>
            )
        }

        // Select options for playerRole
        const options = [
            { label: '* Select Player Role', value: 0},
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
            <div className="createProfile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Create Your Profile</h1>
                            <p className="lead text-center">
                                Let's get some information to make your profile stand out
                            </p >
                            <small className="badge badge-danger badge-pill">* = required fields</small>

                            <form onSubmit={this.onSubmit}>

                                <TextFieldGroup
                                    placeholder="* Profile Handle"
                                    name="nickName"
                                    value={this.state.nickName}
                                    onChange={this.onChange}
                                    error={errors.nickName}
                                    info="A unique nickname for your profile URL."
                                />

                                <SelectListGroup
                                    placeholder="Player Role"
                                    name="playerRole"
                                    value={this.state.playerRole}
                                    onChange={this.onChange}
                                    options={options}
                                    error={errors.playerRole}
                                    info="Give us an idea of your basketball aspect"
                                />

                                <TextFieldGroup
                                    placeholder="Interests"
                                    name="interests"
                                    value={this.state.interests}
                                    onChange={this.onChange}
                                    error={errors.interests}
                                    info="Please use comma separated your interested filed of basketball"
                                />


                                <TextAreaFieldGroup
                                    placeholder="Short description"
                                    name="aboutMe"
                                    value={this.state.aboutMe}
                                    onChange={this.onChange}
                                    error={errors.aboutMe}
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

CreateProfile.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    createProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};


const mapStateToProps= state => ({
    profile: state.profile,
    errors: state.errors

});
export default connect(mapStateToProps, { createProfile, getCurrentProfile})(withRouter(CreateProfile));