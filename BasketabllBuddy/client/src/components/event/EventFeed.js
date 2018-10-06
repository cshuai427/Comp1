import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EventItem from './EventItem';

class EventFeed extends Component {
    render() {
        const { posts } = this.props;

        return posts.map(post => <EventItem key={post._id} post={post} />);
    }
}

EventFeed.propTypes = {
    posts: PropTypes.array.isRequired
};

export default EventFeed;