import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/postActions';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

class PostForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            eventText: '',
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

        console.log('submit');
        const { user } = this.props.auth;
        const newPost = {
            eventText: this.state.eventText,
            name: user.name,
            avatar: user.avatar
        };
        this.props.addPost(newPost);
        this.setState({eventText:''});
    }

    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

    render(){
        const { errors } = this.state;
        return(
            <div>

                <div className="App-middle">
                    <h3>Post Meetup Events</h3>
                    <div className="card-body">

                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <TextAreaFieldGroup
                                placeholder = "make a post"
                                name = "eventText"
                                value={this.state.eventText}
                                onChange={this.onChange}
                                error={errors.eventText}
                            />
                            <button type="submit" className="btn btn-dark">
                                Submit
                            </button>
                        {/*<h3>Your event title</h3>*/}
                        {/*<input type="text" defaultValue="Type your event title here" />*/}
                        {/*<button> Confirm</button>*/}
                        {/*<h3>Please pick your date</h3>*/}
                        {/*<br />*/}
                        {/*<br />*/}
                        {/*<br />*/}
                        {/*<br />*/}
                        {/*<h3>Please pick your time</h3>*/}
                        {/*<h4>Begin*/}
                            {/*<select>*/}
                                {/*<option value ="time">1 pm</option>*/}
                                {/*<option value ="time">2 pm</option>*/}
                                {/*<option value="time">3 pm</option>*/}
                                {/*<option value="time">4 pm</option>*/}
                            {/*</select> End*/}
                            {/*<select>*/}
                                {/*<option value ="time">1 pm</option>*/}
                                {/*<option value ="time">2 pm</option>*/}
                                {/*<option value="time">3 pm</option>*/}
                                {/*<option value="time">4 pm</option>*/}
                            {/*</select>*/}
                        {/*</h4>*/}
                        {/*<h4>Please pick your location*/}
                            {/*<select>*/}
                                {/*<option value ="rule">Unselected</option>*/}
                                {/*<option value ="rule">PF</option>*/}
                                {/*<option value="rule">SF</option>*/}
                                {/*<option value="rule">SG</option>*/}
                                {/*<option value="rule">PG</option>*/}
                                {/*<option value="rule">C</option>*/}
                            {/*</select>*/}
                        {/*</h4>*/}
                        {/*<h4>How many people will go?<*/}
                            {/*select>*/}
                            {/*<option value ="joinNuumber">2</option>*/}
                            {/*<option value ="joinNuumber">3</option>*/}
                            {/*<option value="joinNuumber">4</option>*/}
                            {/*<option value="joinNuumber">5</option>*/}
                            {/*<option value="joinNuumber">more</option>*/}
                        {/*</select>*/}
                        {/*</h4>*/}
                        {/*<h4>Do you have baskerball? <button>Yes </button> <button>No </button></h4>*/}

                        {/*<input type="submit" value="Submit" />*/}
                        </div>
                    </form>
                    </div>
                </div>

            </div>

        )
    }

}

PostForm.propTypes ={
    addPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors

});
export default connect(mapStateToProps, { addPost })(PostForm);

