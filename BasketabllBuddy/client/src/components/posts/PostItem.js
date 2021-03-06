import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link ,withRouter } from 'react-router-dom';
import { deletePost, addLike, removeLike, attendEvent, removeAttendEvent } from "../../actions/postActions";
import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import moment from 'moment';
import isEmpty from "../../validation/is-empty";

class PostItem extends Component{

    componentDidMount() {
        // Get the user profile from redux
        getCurrentProfile();
    }

    onDeleteClick(id){

        // Delete the post by postId, only can be used by owner
        this.props.deletePost(id,this.props.history,'/');
    }

    onLikeClick(id){
        // Pass 'like' this post user id to the like list
        this.props.addLike(id);
    }
    onUnlikeClick(id){
        // Remove 'like' this post user id to the like list
        this.props.removeLike(id);
    }

    // Check user existing in the 'like' list
    findUserLike(likes){
        const { auth } = this.props;
        if(likes.filter(like => like.user === auth.user.id).length > 0) {
            return true;
        }
        else {
            return false;
        }
    }

    onAttendClick(id, nickName, avatar){
        // Pass 'attend' this post user id to the attend list
        if(nickName !== null && avatar !== null) {
            const newAttendUser = {
                nickName : nickName,
                avatar: avatar
            };

            this.props.attendEvent(id, newAttendUser);
        }

    }



    onUnattendClick(id){
        // Remove user from 'attend' list by user id
        this.props.removeAttendEvent(id, this.props.history,'/');
    }

    findUserAttend(attends){

        const { auth } = this.props;

        // Check user existing in the 'attend' list
        if(attends.filter(attend => attend.user === auth.user.id).length > 0) {
            return true;
        } else {
            return false;
        }
    }


    render() {

        const { post, auth } = this.props;
        const { profile, loading } = this.props.profile;

        let attendAvatar;
        let profileAuth = false;

        // Check profile state from redux is not null
        // If it null, this component will invoke loading page until receive data
        if(profile === null || loading) {
            return <Spinner/>;
        }
        else
        {
            if(!isEmpty(profile.nickName)) {
                profileAuth = true;

            }

            if(post.eventAttendPeople.length !== 0) {

                // Display the attend people avatar on the page
                attendAvatar = post.eventAttendPeople.map(user => (
                        <span key={user.user} className="col-1 px-0 pr-2">
                                  <Link to={`/profile/nickname/${user.nickName}`}>
                                      <img
                                      src={user.avatar}
                                      className="rounded-circle w-100 shadow"
                                      alt={user.nickName}
                                      />
                                  </Link>
                                </span>
                    ))
            } else {
                attendAvatar = (<span className="badge badge-success shadow-sm mx-2 px-2">Let's join my event</span>)
            }
        }

        return (
            // Generate event post details page
            <div className="post-display">
                    <div className="container m-3 pl-0 row border rounded shadow-sm bg-light">

                        <div className="col-4 pl-0">
                            <img
                                src={post.photo}
                                className="rounded d-block float-left m-1 w-100"
                                alt="Cover"
                            />
                        </div>
                        <div className="col-7 mt-3 text-left">
                            <h3>{post.eventTitle}</h3>
                            <h6>
                                <i className="fas fa-user" />
                                <span className="badge badge-light font-weight-bold mx-2 px-2">
                                    {post.nickName}
                                </span>
                                <i className="fas fa-tasks" />
                                {moment(post.eventDate).format('YYYY-MM-DD HH:mm') > moment(Date.now()).format('YYYY-MM-DD HH:mm')
                                    ? <span className="badge badge-light font-weight-bold mx-2 px-2">
                                        Not Start
                                    </span>
                                    : <span className="badge badge-warning badge-pill font-weight-bold mx-2 px-2">
                                        END
                                    </span>}
                            </h6>
                            <p className="pb-2 mb-0">{post.eventText}</p>
                            <div className="border-top border-bottom bg-light p-2">

                                <i className="far fa-calendar-times ml-2" />
                                <span className="badge badge-success shadow-sm mx-2 px-2">
                                    {moment(post.eventDate).format('YYYY-MM-DD HH:mm')}
                                </span>

                                <i className="fas fa-map-marker-alt" />
                                <span className="badge badge-success shadow-sm mx-2 px-2">
                                    {post.eventLocation}
                                </span>

                                <i className="fas fa-basketball-ball" />
                                {/* Show whether have basketball status */}
                                <span className={post.haveBall ? 'badge badge-success shadow-sm mx-2 px-2': 'badge badge-danger shadow-sm mx-2 px-2' }>
                                    {post.haveBall ? 'I will take' : 'Need a ball'}
                                </span>
                                {/* Check authentication */}
                                {auth.isAuthenticated
                                    ? (<span>
                                <button
                                    onClick={this.onLikeClick.bind(this, post._id)}
                                    type="button"
                                    className="btn btn-light mr-1"
                                >
                                <i
                                    className={classnames('fas fa-thumbs-up',
                                        {
                                            'text-info'
                                                : this.findUserLike(post.likes)
                                        })} />
                                <span
                                    className="badge badge-light">
                                    {post.likes.length}
                                    </span>
                                 </button>

                                <button
                                    onClick={this.onUnlikeClick.bind(this, post._id)}
                                    type="button"
                                    className="btn btn-light mr-1">
                                    <i
                                        className="text-secondary fas fa-thumbs-down"
                                    />
                                </button>


                                        {post.user === auth.user.id
                                            ?
                                            (<button
                                                onClick={this.onDeleteClick.bind(this, post._id)}
                                                type="button"
                                                className="btn btn-danger mr-1"
                                            >
                                                Delete
                                            </button>)
                                            :null}
                        </span>)
                                    : null}
                            </div>

                            <div className="row my-3 mx-1">
                                {attendAvatar}
                            </div>
                        </div>
                        {/* To check the authentication of joining the event*/}
                        {auth.isAuthenticated
                            ? (<div className="col-1 py-4 px-1">
                                <h5>
                                    {/* Show event attending people numbers*/}
                                    <span className="badge badge-light align-middle bg-white w-100">
                                        {post.eventPeopleNumber - post.eventAttendPeople.length <= 0 ? 0 : post.eventPeopleNumber - post.eventAttendPeople.length}
                                    </span>
                                    <span className={(post.eventPeopleNumber - post.eventAttendPeople.length) < 3
                                        ? "badge badge-danger align-middle mb-2 w-100" : "badge badge-primary align-middle mb-2 w-100"}>
                                        {post.eventPeopleNumber - post.eventAttendPeople.length <=0 ? 'Full' : 'Remain'}
                                    </span>
                                </h5>
                                {/* Option for joining the event and add the users to the event */}
                            <button
                                onClick={this.onAttendClick.bind(this, post._id, profile.nickName, auth.user.avatar)}
                                type="button"
                                className="btn btn-sm btn-outline-success mb-2 w-100"
                                disabled=
                                    {this.findUserAttend(post.eventAttendPeople)
                                    || post.eventPeopleNumber === post.eventAttendPeople.length
                                    || !profileAuth
                                    || !(moment(post.eventDate).format('YYYY-MM-DD HH:mm') > moment(Date.now()).format('YYYY-MM-DD HH:mm'))}
                            >


                                <i className="fas fa-check"/>
                                <span
                                    className="badge badge-light"
                                >
                                    {post.eventAttendPeople.length}
                                </span>
                            </button>
                            {/* Check whether the user has already chose to attend the event */}
                            <button
                                onClick={this.onUnattendClick.bind(this, post._id)}
                                type="button"
                                className="btn btn-sm btn-outline-secondary mb-2 w-100"
                                disabled={
                                    !this.findUserAttend(post.eventAttendPeople)
                                    || post.eventPeopleNumber === post.eventAttendPeople.length
                                    || !profileAuth
                                    || !(moment(post.eventDate).format('YYYY-MM-DD HH:mm') > moment(Date.now()).format('YYYY-MM-DD HH:mm'))}
                            >
                                <i className="fas fa-times"/>
                            </button>
                            </div>) : null}
                    </div>
            </div>
        );
    }
}



PostItem.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    attendEvent: PropTypes.func.isRequired,
    removeAttendEvent: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state =>({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, {getCurrentProfile, deletePost, addLike, removeLike, removeAttendEvent, attendEvent})(withRouter(PostItem));