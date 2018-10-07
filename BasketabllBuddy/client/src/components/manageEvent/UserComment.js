
import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

class UserComment extends Component {



    render() {

        const { post, auth } = this.props;

        let commentManageContent;

        commentManageContent = post.comments.map(comment => (
            auth.user.id === comment.user
                ?
                <tr key={comment._id} >
                    <td width="25%"><Link to={`/post/${post._id}`}>{post.eventTitle}</Link></td>
                    <td width="25%">{comment.text}</td>
                    <td width="25%">{comment.date}</td>
                    <td width="25%">
                        <button onClick={this.props.onDeleteCommentClick.bind(this, post._id, comment._id)}
                                className="btn btn-danger">Delete
                        </button>
                    </td>
                </tr>
                : null));
        return (
            <div>
                <table className="table">
                    <tbody>
                    {commentManageContent}
                    </tbody>
                </table>
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