import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { deletePost } from '../../actions/postActions';
import moment from 'moment';

class UserPost extends Component {


    onDeletePostClick(postId) {
        this.props.deletePost(postId);
    }

    render() {

        const { posts, auth } = this.props;
        let number = 0;
        let postedEvent = posts.map(post=>(
            auth.user.id === post.user ?
                <tr key={post._id}>
                    <th>{++number}</th>
                    <td><Link to={`/post/${post._id}`} >{post.eventTitle}</Link></td>
                    <td>{moment(post.createDate).format('YYYY-MM-DD HH:mm')}</td>
                    <td><button
                        onClick={this.onDeletePostClick.bind(this, post._id)}
                        className="btn btn-sm btn-outline-danger w-50">
                        <i className="fas fa-times"/>
                    </button></td>
                </tr>
                : null));
        return (
            <div className="container m-3 py-3 mx-auto pl-0 row border rounded shadow-sm">
                <h4 className="m-2 mx-auto">Your Posted Events</h4>
                <table className="table table-sm">
                    <thead>
                    <tr className="table-info">
                        <th scope="col">#</th>
                        <th scope="col">Event Title</th>
                        <th scope="col">Create Date</th>
                        <th scope="col"/>
                    </tr>
                    </thead>
                    <tbody>
                    {postedEvent}
                    </tbody>
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