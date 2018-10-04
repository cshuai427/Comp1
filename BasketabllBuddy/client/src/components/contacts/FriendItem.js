import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


class FriendItem extends Component {



    render() {

        const { profile } = this.props;

        return (
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <Link to={`/profile/${profile._id}`}>
                <img src={profile.user.avatar}
                     alt="avatar"
                     className="rounded-circle"
                     style={{width:'25px' ,height:'25px'}}/>{' '+ profile.user.name}
                </Link>
                <Link to={'/'} className="badge badge-primary badge-pill">2</Link>
            </li>

        );
    }
}

FriendItem.propTypes = {
    profile: PropTypes.object.isRequired
};


export default FriendItem;
