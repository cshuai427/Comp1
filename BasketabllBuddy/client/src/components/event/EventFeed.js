import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EventItem from './EventItems';

class EventFeed extends Component {

    render() {
        // Pass each post obj to children component
        const { posts } = this.props;

        return posts.map(post => <EventItem key={post._id} post={post} />);
    }
}

EventFeed.propTypes = {
    posts: PropTypes.array.isRequired
};

export default EventFeed;