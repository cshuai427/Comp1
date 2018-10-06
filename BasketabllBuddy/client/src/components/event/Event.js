import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from '../../validation/is-empty';

// Should be removed
import basketball1 from "../../Img/basketball1.jpeg";
import basketball2 from "../../Img/basketball2.jpg";

// components
import { getPosts } from '../../actions/postActions';
import Spinner from '../common/Spinner';
import EventFeed from './EventFeed';

class Event extends Component {


    componentDidMount(){
        this.props.getPosts();
    }

    render(){

        const { posts, loading } = this.props.post;
        let postContent;

        if(isEmpty(posts) || loading){
            postContent = <Spinner/>
        }
        else
        {
            postContent = <EventFeed posts={posts}/>
        }

        return(

            <div className="Event">

                <h1>Basketball Meetup Events</h1>
                <hr />
                <div>
                    < img src={ basketball1 } width="200" height="100"  />
                    <h3>Saturday Event</h3>
                    <p>Hello everyone, this Saturday I will play basketball at central. Anyone has time could join me. Welcome <a href=" "> View</a ></p >
                    <hr/>
                    <h3>Sunday Event</h3>
                    <p>Hello everyone, this Saturday I will play basketball at central. Anyone has time could join me. Welcome<a href="/event/commit"> View</a ></p >
                    <hr/>
                    < img src={ basketball2 } width="200" height="100"  />
                    <h3>Saturday Event</h3>
                    <p>Hello everyone, this Saturday I will play basketball at central. Anyone has time could join me. Welcome <a href="/event/commit"> View</a ></p >
                    <hr/>
                    {postContent}
                </div>

            </div>



        );
    }

}


Event.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = state =>({
    post: state.post
});


export default connect(mapStateToProps, {getPosts})(Event);