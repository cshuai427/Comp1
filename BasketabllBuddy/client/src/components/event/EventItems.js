import React, {Component} from 'react';
import basketball1 from "../../Img/basketball1.jpeg";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

class EventItems extends Component {


    render() {

        const { post } = this.props;
        return (
            <div className="eventItem" style={{backgroundColor: 'white',marginLeft: '6%',
                marginRight: '6%',
                marginTop: '3%',
                marginBottom: '3%',
                borderRadius: '10px',
                paddingTop: '15px', height:'240px'}}>
                <div className="events1 col-xl-3 col-sm-3 col-lg-3 col-xs-3">
                    <div className="imageItem img-responsive" style={{align:'left'}}>
                        < img src={ basketball1 } style={{width:'100%',height:'100%',position:'relative',}}  alt={post.photo} />
                    </div>
                    {/*<div className="">*/}
                        {/*<img className="rounded-circle" src={post.avatar} width="30px" height="30px" alt={post.avatar} />*/}
                    {/*</div>*/}
                    {/*{post.nickName}*/}
                </div>
                <div className="events2 col-lg-8 col-xl-8 col-xs-8 col-sm-8">

                    <div clasName="events2">
                        <h3>{post.eventTitle}</h3>
                        <p className="p">
                            {post.eventText}
                            </p>
                        <p>
                        {post.eventLocation}
                        </p>
                        <p>
                        {post.eventDate}
                        </p>
                        <p>
                        {post.eventAttendPeople}
                        </p>
                            <Link to={`/post/${post._id}`} className="badge badge-primary badge-pill">
                                View
                            </Link>
                        {/*<hr/>*/}
                    </div>
                </div>
            </div>
        )
    }
}

EventItems.propTypes = {
    post: PropTypes.object.isRequired
};


export default EventItems;