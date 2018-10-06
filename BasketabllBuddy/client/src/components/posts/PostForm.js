import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/postActions';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import  SelectListGroup from '../common/SelectListGroup';
import TextFieldGroup from '../common/TextFieldGroup';
import InputGroup from '../common/InputGroup';

class PostForm extends Component{
    constructor() {
        super();
        this.state = {
            eventTitle: '',
            eventText: '',
            eventPeopleNumber: '1',
            eventLocation: 'Sydney',
            haveBall: 'false',
            eventDate: '',
            photo: '',
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(newProps){
        if(newProps.errors){
            this.setState({ errors: newProps.errors });
        }
    }
    onSubmit(e){
        e.preventDefault();
        const { user } = this.props.auth;
        const { profile } = this.props.profile;
        console.log(profile.nickName);
        const newPost = {
            eventTitle: this.state.eventTitle,
            eventText: this.state.eventText,
            photo: this.state.photo,
            eventPeopleNumber: this.state.eventPeopleNumber,
            eventLocation: this.state.eventLocation,
            haveBall: this.state.haveBall,
            eventDate: this.state.eventDate,
            avatar: user.avatar,
            nickName: profile.nickName
            // avatar: user.avatar
        };
        this.props.addPost(newPost, this.props.history);
    }

    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }



    render(){

        const { errors } = this.state;

        // Select options for number of event people
        const numberOfPeople = [
            { label: 1 ,value: 1 },
            { label: 2 ,value: 2 },
            { label: 3 ,value: 3 },
            { label: 4 ,value: 4 },
            { label: 5 ,value: 5 },
            { label: 6 ,value: 6 },
            { label: 7 ,value: 7 },
            { label: 8 ,value: 8 },
            { label: 9 ,value: 9 }
        ];

        // Select options for event location
        // Need to fix
        const location = [
            { label: 'Sydney' ,value: 'Sydney' },
            { label: 'UTS' ,value: 'UTS' },
            { label: 'Other Place' ,value: 'Other Place' }
        ];

        // Select options for have ball

        const ballStatus = [
            { label: 'Yes' ,value: true },
            { label: 'No' ,value: false }
        ];
        return(
            <div className="add-post">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">

                            <h4 className="badge badge-primary badge-pill display-4 text-center">
                                Post Your Meetup Events
                            </h4>

                            <p className="lead text-center">
                                Let's post a event to find friend play basketball together
                            </p >

                            <small className="d-block pb-3">* = required fields</small>

                            <form onSubmit={this.onSubmit}>

                                <TextFieldGroup
                                    placeholder="* Event Title"
                                    onChange={this.onChange}
                                    value={this.state.eventTitle}
                                    error={errors.eventTitle}
                                    name="eventTitle"
                                />

                                <InputGroup
                                    placeholder="* Event Description"
                                    onChange={this.onChange}
                                    value={this.state.eventText}
                                    error={errors.eventText}
                                    name="eventText"
                                    icon="fas fa-pen"
                                    info="Please describe your Meetup "
                                />

                                <SelectListGroup
                                    placeholder="* Number of people required"
                                    onChange={this.onChange}
                                    value={this.state.eventPeopleNumber}
                                    name="eventPeopleNumber"
                                    error={errors.eventPeopleNumber}
                                    options={numberOfPeople}
                                    info="Please select a number of people you required"
                                />

                                <SelectListGroup
                                    placeholder="* Event Location"
                                    onChange={this.onChange}
                                    value={this.state.eventLocation}
                                    name="eventLocation"
                                    error={errors.eventLocation}
                                    options={location}
                                    info="Please select location, if not include in the list, please fill it in the Description"
                                />

                                <SelectListGroup
                                    placeholder="* Do you have Ball?"
                                    onChange={this.onChange}
                                    type="boolean"
                                    value={this.state.haveBall}
                                    name="haveBall"
                                    error={errors.haveBall}
                                    options={ballStatus}
                                    info="If you won't take ball, just select no, other attend people may take it for you"
                                />

                                <InputGroup
                                    placeholder="* Event Date"
                                    onChange={this.onChange}
                                    value={this.state.eventDate}
                                    error={errors.eventDate}
                                    name="eventDate"
                                    icon="far fa-calendar-alt"
                                    info="Please fill in your Event Date "
                                />

                                <InputGroup
                                    placeholder="Title Photo"
                                    onChange={this.onChange}
                                    value={this.state.photo}
                                    error={errors.photo}
                                    name="photo"
                                    icon="far fa-calendar-alt"
                                    info="You can upload a image for attract people to join your event"
                                />

                                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>
                            </form>

                        </div>
                    </div>
                </div>
            </div>

        )
    }

}

PostForm.propTypes ={
    addPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    errors: state.errors

});
export default connect(mapStateToProps, { addPost })(PostForm);