import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteComment } from '../../actions/postActions';
import { Link } from 'react-router-dom';

class CommentItem extends Component {

    onDeleteClick(postId, commentId){
        this.props.deleteComment(postId,commentId);
    }

    render() {

        const { comment, postId, auth } = this.props;

        return (
            <div className="Comment">

                <div className="container m-3 py-3 pl-0 row border rounded shadow-sm bg-light">
                    <div className="col-2">
                        <Link to={`/profile/nickname/${comment.nickName}`}>
                            <img
                                src={comment.avatar}
                                className="rounded-circle w-100 shadow"
                                alt={comment.nickName}
                            />
                        </Link>

                        <p className="font-weight-bold py-2 mb-0">{comment.nickName}</p >
                    </div>
                    <div className="col-9 rounded-left bg-light border border-right-0 mt-0 text-left">
                        <h5 className="d-inline-block font-italic py-3 px-1">
                            {comment.text}
                        </h5>
                    </div>
                    <div className="col-1 px-1">
                        {comment.user === auth.user.id ?
                            (<button onClick={this.onDeleteClick.bind(this, postId, comment._id)}
                                     type="button" className="btn btn-sm btn-outline-danger h-100 mb-2 w-100">
                                <i className="fas fa-times" />
                            </button>):null}
                    </div>
                </div>
            </div>
        );
    }
}

CommentItem.propTypes = {
    deleteComment: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired

};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);