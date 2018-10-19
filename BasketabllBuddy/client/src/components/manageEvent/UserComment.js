
import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

class UserComment extends Component {

    render() {

        const { post, auth } = this.props;

        let number = 0;
        let commentManageContent;

        commentManageContent = post.comments.map(comment => (
            auth.user.id === comment.user ?
                <table className="table table-sm">
                    <tbody>
                <tr key={comment._id} >
                    <td><Link to={`/post/${post._id}`}>{post.eventTitle}</Link></td>
                    <td>{comment.text}</td>
                    <td>{comment.date}</td>
                        <button onClick={this.props.onDeleteCommentClick.bind(this, post._id, comment._id)}
                                className="btn btn-sm btn-outline-danger w-50">
                            <i className="fas fa-times"/>
                        </button>
                </tr>
                    </tbody>
                </table>
                : number++));
        return (
            <div className={number === post.comments.length ? "invisible" :"container m-3 py-3 mx-auto pl-0 row border rounded shadow-sm"}>
                   {commentManageContent}
            </div>

        );
    }
}

UserComment.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(UserComment);  