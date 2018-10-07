import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import {Link, withRouter} from 'react-router-dom';
import { deletePost, addLike, removeLike, attendEvent, removeAttendEvent } from "../../actions/postActions";
import { getCurrentProfile } from '../../actions/profileActions';

// should be fix
import basketBall1 from '../../Img/basketball1.jpeg'

class PostItem extends Component{

    constructor(props) {
        super(props);
        this.state = {
            nickName: '',
            avatar: ''
        }
    }


    componentDidMount()
    {
        getCurrentProfile();
        if(!this.props.profile.profile === null)
        {
            this.setState({nickName: this.props.profile.profile.nickName});
            this.setState(({avatar: this.props.profile.profile.avatar}));
        }
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

    onAttendClick(id){


        if(this.state.nickName !== null)
        {
            const newAttendUser = {
                nickName : this.state.nickName,
                avatar: this.state.avatar
            };
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


        console.log(post);
        return (
            <div className="col-md-12">
                <div className="card card-body bg-light mb-3">

                    <h3 className="text-center text-info">{post.eventTitle}</h3>

                    < img src={basketBall1} width="200" height="100" style={{paddingLeft:'4%'}}/>
                    <p></p>

                    <div className="postItem">
                        <p className="lead"><strong>Owner: </strong>{post.nickName}</p >
                        <p className="lead"><strong>Description: </strong>{post.eventText}</p >
                        <p className="lead"><strong>Location: </strong>{post.eventLocation}</p >
                        <p className="lead"><strong>Time: </strong>{post.eventDate}</p >
                        <p className="lead"><strong>Status: </strong>{post.eventOverStatus ? 'Over': 'Not begin'}</p >
                        <p className="lead"><strong>Have ball? </strong>{post.haveBall ? 'Yes': 'No'}</p >
                        <p className="lead"><strong>Required number of People: </strong>{post.eventPeopleNumber}</p >
                        <p className="lead"><strong>Who will go: </strong>{post.eventAttendPeople.length === 0? 'None' : post.eventAttendPeople.length}</p >
                        <p className="lead"><strong>Do you want to attend ? </strong></p >


                        /*/event attend /*/
                        {auth.isAuthenticated ? (<span>
                            <button onClick={this.onAttendClick.bind(this, post._id)} type="button" className="btn btn-light mr-1">
                            <i className={classnames('far fa-check-square', {
                                'text-info': this.findUserLike(post.eventAttendPeople)
                            })} />
                            <span className="badge badge-light">{post.eventAttendPeople.length}</span>
                        </button>

                        <button onClick={this.onUnattendClick.bind(this, post._id)} type="button" className="btn btn-light mr-1">
                            <i className="text-secondary far fa-check-square" />
                        </button>

                        </span>) : null}

                        /*/event like /*/
                        {auth.isAuthenticated ? (<span>
                            <button onClick={this.onLikeClick.bind(this, post._id)} type="button" className="btn btn-light mr-1">
                            <i className={classnames('fas fa-thumbs-up', {
                                'text-info': this.findUserAttend(post.likes)
                            })} />
                            <span className="badge badge-light">{post.likes.length}</span>
                        </button>

                        <button onClick={this.onUnlikeClick.bind(this, post._id)} type="button" className="btn btn-light mr-1">
                            <i className="text-secondary fas fa-thumbs-down" />
                        </button>


                            {post.user === auth.user.id ?
                                (<button onClick={this.onDeleteClick.bind(this, post._id)}
                                         type="button" className="btn btn-danger mr-1">
                                    Delete
                                </button>):null}
                        </span>) : null}
                    </div>
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
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state =>({
    auth: state.auth,
    profile: state.auth
});

export default connect(mapStateToProps, {deletePost, addLike, removeLike, removeAttendEvent, attendEvent, getCurrentProfile})(withRouter(PostItem));