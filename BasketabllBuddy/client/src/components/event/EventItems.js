import React, {Component} from 'react';
import basketball1 from "../../Img/basketball1.jpeg";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import moment from "moment";

class EventItems extends Component {


    render() {

        const { post } = this.props;
        return (
            <div className="eventItem" style={{backgroundColor: 'white',marginLeft: '6%',
                marginRight: '6%',
                marginTop: '3%',
                marginBottom: '3%',
                borderRadius: '10px',
                paddingTop: '15px', paddingBottom:'15px', height:'300p',overflow:'auto'}}>
                <div className="events1 col-xl-3 col-sm-3 col-lg-3 col-xs-3">
                    <div className="imageItem img-responsive" style={{align:'center',textAlign:'left'}}>
                        < img src={ basketball1 } style={{width:'100%',height:'100%',position:'relative',}}  alt={post.photo} />
                    </div>
                    {/*<div className="">*/}
                    {/*< img className="rounded-circle" src={post.avatar} width="30px" height="30px" alt={post.avatar} />*/}
                    {/*</div>*/}
                    {/*{post.nickName}*/}
                </div>
                <div className="events2 col-lg-8 col-xl-8 col-xs-8 col-sm-8">

                    <div className="events2">
                        <h3>{post.eventTitle}</h3>
                        <p className="p">
                            {post.eventText}
                        </p >
                        <p>
                            {post.eventLocation}
                        </p >
                        <p>
                            {moment(post.eventDate).format('YYYY-MM-DD HH:mm')}
                        </p >
                        <p>
                            Number of attend: {post.eventAttendPeople.length} of {post.eventPeopleNumber}
                        </p >
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