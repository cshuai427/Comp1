import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/postActions';
import  SelectListGroup from '../common/SelectListGroup';
import TextFieldGroup from '../common/TextFieldGroup';
import InputGroup from '../common/InputGroup';
import {numberOfPeople, location, ballStatus} from './PostSelectOptions';
import isEmpty from '../../validation/is-empty';
import {Link, Redirect} from 'react-router-dom';
import Spinner from '../common/Spinner';
import { getCurrentProfile } from '../../actions/profileActions';
import DatePicker from 'react-datepicker'
import moment from "moment";
import 'react-datepicker/dist/react-datepicker.css';




class PostForm extends Component{
    constructor() {
        super();
        this.state = {
            eventTitle: '',
            eventText: '',
            eventPeopleNumber: '1',
            eventLocation: 'UTS',
            haveBall: 'false',

            photo: '',
            errors: {},
            //datepicker: '',
            eventDate: moment().add(+1,'d'),


        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.props.getCurrentProfile();
    }

    componentWillReceiveProps(newProps){
        if(newProps.errors){
            this.setState({ errors: newProps.errors });
        }
    }
    handleChange(date) {

        this.setState({
            eventDate: date

        });

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
        };
        this.props.addPost(newPost, this.props.history);
    }

    onChange(e){
        this.setState({[e.target.name]:e.target.value})

    }

    render(){

        const { errors } = this.state;


        const { profile, loading } = this.props.profile;

        if(profile === null || loading )
        {
            return <Spinner />
        }
        else
        {
            if(isEmpty(profile.nickName))
                return  <Redirect to='/create-profile' />
        }

        return(
            <div className="add-post">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <div className="align-baseline">
                                <Link to='/profile-view' className="btn btn-light float-left">
                                    Go Back
                                </Link>
                            </div>
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

                                {/*<InputGroup*/}
                                    {/*placeholder="* Event Date"*/}
                                    {/*onChange={this.onChange}*/}
                                    {/*value={this.state.eventDate}*/}
                                    {/*error={errors.eventDate}*/}
                                    {/*name="eventDate"*/}
                                    {/*icon="far fa-calendar-alt"*/}
                                    {/*info="Please fill in your Event Date "*/}
                                {/*/>*/}

                                <InputGroup
                                    placeholder="Title Photo"
                                    onChange={this.onChange}
                                    value={this.state.photo}
                                    error={errors.photo}
                                    name="photo"
                                    icon="far fa-calendar-alt"
                                    info="You can upload a image for attract people to join your event"
                                />


                                <DatePicker  className='form-control form-control-lg'
                                             selected={this.state.eventDate}
                                             onChange={this.handleChange}
                                             startDate={moment().add(+1,'d')}
                                             showTimeSelect
                                             timeIntervals={30}
                                             dateFormat="YYYY-MM-DD HH:mm"
                                             timeCaption="time"
                                             minDate={ moment().add(+1,'d')}
                                />
                                <small className="badge badge-danger badge-pill">Please Select your event date</small>


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
    getCurrentProfile: PropTypes.func.isRequired,
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
export default connect(mapStateToProps, { addPost, getCurrentProfile })(PostForm);