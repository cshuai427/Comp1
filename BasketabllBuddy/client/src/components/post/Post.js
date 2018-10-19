import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import { getPost } from '../../actions/postActions';
import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner';




class Post extends Component {

    componentDidMount(){
        // Get post id from the url and get the post data from the actions which get data from back-end api
        this.props.getPost(this.props.match.params.id);
        this.props.getCurrentProfile();

    }

    render() {
        const { post, loading } = this.props.post;
        let postContent;

        // Check post state from redux is not null
        // If it null, this component will invoke loading page until receive data
        if(post === null || loading || Object.keys(post).length === 0){
            postContent = <Spinner />
        } else {
            // Pass post value for the children components with postId and following comments
            postContent = (
                <div>
                    <PostItem post={post}/>

                    <CommentForm postId={post._id}/>

                    <CommentFeed postId={post._id} comments={post.comments} />

                </div>
            );
        }

        return (
            // Post content details page
            <div className="post">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link to="/" className="btn btn-light mb-3 ">
                                Back to event
                            </Link>
                            {postContent}
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    post: state.post,
    profile: state.profile
});

export default connect(mapStateToProps, { getPost, getCurrentProfile })(Post);