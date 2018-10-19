
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { getPosts } from '../../actions/postActions';
import UserPost from './UserPost';
import UserCommentFeed from './UserCommentFeed';
import { deleteComment } from '../../actions/postActions';
import {Link} from "react-router-dom";


class ManagePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delete: false
        }
    }


    componentDidMount(){
        this.props.getPosts();
    }

    onDeleteCommentClick(postId, commentId) {
        this.props.deleteComment(postId, commentId);
        this.setState({delete: true})
    }

    componentWillReceiveProps() {
        if(this.state.delete) {
            window.location.reload();
        }
    }

    render() {


        const { posts, loading } = this.props.post;

        let ManageContent;
        let ManageCommentContent;

        if(posts === null || loading){
            ManageContent = <Spinner/>;
        } else {
            ManageContent = (
                <UserPost posts={posts} />
            );

            ManageCommentContent = <UserCommentFeed posts={posts} onDeleteCommentClick={this.onDeleteCommentClick.bind(this)}/>
        }


        return (

            <div className="manage-post">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="align-baseline">
                                <Link to='/profile-view' className="btn btn-light float-left">
                                    Go Back
                                </Link>
                            </div>
                            <h1 className="display-4">
                                Event Management
                            </h1>
                            <div className="container m-3 py-3 mx-auto pl-0 row border rounded shadow-sm">
                            {ManageContent}
                            <h4 className="m-2 mx-auto">Your posted Comment</h4>

                                <table className="table table-sm">
                                    <thead>
                                    <tr className="table-info">
                                        <th scope="col">Event Title</th>
                                        <th scope="col">Comment Content</th>
                                        <th scope="col">Create Date</th>
                                        <th scope="col"/>
                                    </tr>
                                    </thead>
                                </table>
                                {ManageCommentContent}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


ManagePost.propTypes = {
    deleteComment: PropTypes.func.isRequired,
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = state =>({
    post: state.post
});


export default connect(mapStateToProps, { getPosts, deleteComment })(ManagePost);
