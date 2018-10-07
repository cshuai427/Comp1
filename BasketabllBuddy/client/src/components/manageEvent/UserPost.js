import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { deletePost } from '../../actions/postActions';

class UserPost extends Component {


    onDeletePostClick(postId)
    {
        this.props.deletePost(postId);
    }

    render() {

        const { posts, auth } = this.props;

       let postedEvent = posts.map(post=>(
            auth.user.id === post.user
                ?
                <tr key={post._id}>
                    <td><Link to={`/post/${post._id}`} >{post.eventTitle}</Link></td>
                    <td>{post.createDate}</td>
                    <td><button onClick={this.onDeletePostClick.bind(this, post._id)} className="btn btn-danger">Delete</button></td>
                </tr>
                : null));
        return (
            <div>
                <h4 className="mb-4">You posted Event</h4>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Event Title</th>
                        <th>Create Date</th>
                        <th />
                    </tr>
                    {postedEvent}
                    </thead>
                </table>
            </div>
        );
    }
}

UserPost.propTypes = {
    posts: PropTypes.array.isRequired,
    auth: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired
};


const mapStateToProps = state =>({
    auth: state.auth
});


export default connect(mapStateToProps,{ deletePost })(UserPost);