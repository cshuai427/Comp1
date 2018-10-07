import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link ,withRouter } from 'react-router-dom';
import { deletePost, addLike, removeLike, attendEvent, removeAttendEvent } from "../../actions/postActions";
import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
// should be fix
import basketBall1 from '../../Img/basketball1.jpeg'
import moment from 'moment';

class PostItem extends Component{

    componentDidMount()
    {
        getCurrentProfile();
    }

    onDeleteClick(id){

        this.props.deletePost(id,this.props.history,'/');
    }

    onLikeClick(id){
        this.props.addLike(id);
    }
    onUnlikeClick(id){
        this.props.removeLike(id);
    }

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

        if(nickName !== null)
        {
            const newAttendUser = {
                nickName : nickName,
                avatar: avatar
            };
            console.log(id);
            this.props.attendEvent(id, newAttendUser);
        }

    }



    onUnattendClick(id){
        this.props.removeAttendEvent(id, this.props.history,'/');
    }

    findUserAttend(attends){

        const { auth } = this.props;
        if(attends.filter(attend => attend.user === auth.user.id).length > 0) {
            return true;
        }
        else {
            return false;
        }
    }


    render() {

        const { post, auth } = this.props;
        const { profile, loading } = this.props.profile;

        let attendAvatar;
        let disableValue = false;
        if(profile === null || loading)
        {
            return <Spinner/>;
        }
        else
        {

            if(post.eventAttendPeople.length !== 0)
            {
                disableValue = post.eventAttendPeople.map(user =>
                {
                    if(user.user === auth.user.id)
                    {
                        return true;
                    }
                });

                attendAvatar = post.eventAttendPeople.map(user =>
                    (
                        <span key={user.user} className="col-1 px-0 pr-2">
                                  <Link to={`/profile/nickname/${user.nickName}`}><img
                                      src={user.avatar}
                                      className="rounded-circle w-100 shadow"
                                      alt={user.nickName}
                                  />
                                  </Link>
                                </span>
                    ))
            }
            else
            {
                return  <span className="col-1 px-0 pr-2">None</span>
            }
        }

        return (
            <div className="post-display">
                    <div className="container m-3 pl-0 row border rounded shadow-sm bg-light">

                        <div className="col-4 pl-0">
                            <img
                                src={post.photo}
                                className="rounded d-block float-left m-1 w-100"
                                alt="Photo"
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
                                <span className="badge badge-light font-weight-bold mx-2 px-2">
                                    {post.eventOverStatus ? 'Over' : 'Not Start'}
                                </span>
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
                                <span className={post.haveBall ? 'badge badge-success shadow-sm mx-2 px-2': 'badge badge-danger shadow-sm mx-2 px-2' }>
                                    {post.haveBall ? 'I will take' : 'Need a ball'}
                                </span>
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

                        {auth.isAuthenticated
                            ? (<div className="col-1 py-4 px-1">
                                <h5>
                                    <span className="badge badge-light align-middle bg-white w-100">
                                        {post.eventPeopleNumber - post.eventAttendPeople.length <= 0 ? 0 : post.eventPeopleNumber - post.eventAttendPeople.length}
                                    </span>
                                    <span className={(post.eventPeopleNumber - post.eventAttendPeople.length) < 3
                                        ? "badge badge-danger align-middle mb-2 w-100" : "badge badge-primary align-middle mb-2 w-100"}>
                                        {post.eventPeopleNumber - post.eventAttendPeople.length <=0 ? 'Full' : 'Remain'}
                                    </span>
                                </h5>
                            <button
                                onClick={this.onAttendClick.bind(this, post._id, profile.nickName, auth.user.avatar)}
                                type="button"
                                className="btn btn-sm btn-outline-success mb-2 w-100">

                                <i className={classnames('fas fa-check',
                                    {
                                        'text-info'
                                            : this.findUserAttend(post.eventAttendPeople)
                                    })} />
                                <span
                                    className="badge badge-light"
                                >
                                    {post.eventAttendPeople.length}
                                </span>
                            </button>

                            <button
                                onClick={this.onUnattendClick.bind(this, post._id)}
                                type="button"
                                className="btn btn-sm btn-outline-secondary mb-2 w-100"
                            >
                                <i
                                    className="fas fa-times"
                                />
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