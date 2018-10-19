import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';


class CommentFeed extends Component {

    // Pass each comment value to children component
    render() {

        const { comments, postId } = this.props;
        return comments.map(comment =>
            <CommentItem key={comment._id} comment={comment} postId={postId}/>)
    }
}

CommentFeed.propTypes = {
    comments: PropTypes.array.isRequired,
    postId: PropTypes.string.isRequired
};

export default CommentFeed;