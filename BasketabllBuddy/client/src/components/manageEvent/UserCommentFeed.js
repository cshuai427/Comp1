import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserComment from './UserComment';

class UserCommentFeed extends Component {
    render() {
        const { posts, auth } = this.props;

        // Pass each user's comment value to children component
        return posts.map(post =>
            <UserComment key={post._id} post={post} auth={auth} onDeleteCommentClick={this.props.onDeleteCommentClick}/>
        );
    }
}

UserCommentFeed.propTypes = {
    posts: PropTypes.array.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});



export default connect(mapStateToProps)(UserCommentFeed);