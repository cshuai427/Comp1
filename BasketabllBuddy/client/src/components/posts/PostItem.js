import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost, addLike, removeLike  } from "../../actions/postActions";

// should be fix
import basketBall1 from '../../Img/basketball1.jpeg'

class PostItem extends Component{


    onDeleteClick(id){
        this.props.deletePost(id);
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


    render() {

        const { post, auth } = this.props;

        return (
            <div className="col-md-12">
                <div className="card card-body bg-light mb-3">

                    <h3 className="text-center text-info">{post.eventTitle}</h3>

                    < img src={basketBall1} width="200" height="100" />

                    <div className="">

                        <p className="lead">{post.eventText}</p >

                        {auth.isAuthenticated ? (<span>
                            <button onClick={this.onLikeClick.bind(this, post._id)} type="button" className="btn btn-light mr-1">
                            <i className={classnames('fas fa-thumbs-up', {
                                'text-info': this.findUserLike(post.likes)
                            })} />
                            <span className="badge badge-light">{post.likes.length}</span>
                        </button>

                        <button onClick={this.onUnlikeClick.bind(this, post._id)} type="button" className="btn btn-light mr-1">
                            <i className="text-secondary fas fa-thumbs-down" />
                        </button>


                            {post.user === auth.user.id ?
                                (<button onClick={this.onDeleteClick.bind(this, post._id)}
                                         type="button" className="btn btn-danger mr-1">
                                    <i className="fas fa-times" />
                                </button>):null}
                        </span>) : null}
                    </div>
                </div>
            </div>
        );
    }
}



PostItem.propTypes = {
    deletePost: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state =>({
    auth: state.auth
});

export default connect(mapStateToProps, {deletePost, addLike, removeLike})(PostItem);