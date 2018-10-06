import React, {Component} from 'react';
import basketball1 from "../../Img/basketball1.jpeg";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

class EventItems extends Component {


    render() {

        const { post } = this.props;
        return (
            <div>
                < img src={ basketball1 } width="200" height="100" alt={post.photo} />
                <h3>{post.eventTitle}</h3>
                <p>
                    {post.eventText}
                </p >
                <Link to={`/post/${post._id}`} className="badge badge-primary badge-pill">
                    View
                </Link>
                <hr/>
            </div>
        );
    }
}

EventItems.propTypes = {
    post: PropTypes.object.isRequired
};


export default EventItems;