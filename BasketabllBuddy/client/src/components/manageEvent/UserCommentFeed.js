import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserComment from './UserComment';

class UserComentFeed extends Component {
    render() {
        const { posts, auth } = this.props;

        return posts.map(post =>

            <UserComment key={post._id} post={post} auth={auth} onDeleteCommentClick={this.props.onDeleteCommentClick}/>
        );
    }
}

UserComentFeed.propTypes = {
    posts: PropTypes.array.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});



export default connect(mapStateToProps)(UserComentFeed);