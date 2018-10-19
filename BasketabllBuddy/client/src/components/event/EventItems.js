import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

class EventItems extends Component {

    // Render each post in this page
    render() {

        const { post } = this.props;
        return (
            <div className="eventItem" style={{backgroundColor: 'white',marginLeft: '6%',
                marginRight: '6%',
                marginTop: '3%',
                marginBottom: '3%',
                borderRadius: '10px',
                paddingTop: '15px', paddingBottom:'15px', height:'300p',overflow:'auto'}}>



                <div className="post-display">
                    <div className="container m-3 pl-0 row border rounded shadow-sm bg-light">

                        <div className="col-4 pl-0">
                            <img
                                src={post.photo}
                                className="rounded d-block float-left m-1 w-100"
                                alt="Cover"
                            />
                        </div>
                        <div className="col-7 mt-3 text-left">
                            <h3>{post.eventTitle}</h3>
                            <h6>
                                <i className="fas fa-user" />
                                <span className="badge badge-light font-weight-bold mx-2 px-2">
                                    {post.nickName}
                                </span>
                                <i className="fas fa-tasks" />

                                {moment(post.eventDate).format('YYYY-MM-DD HH:mm') > moment(Date.now()).format('YYYY-MM-DD HH:mm')
                                    ? <span className="badge badge-light font-weight-bold mx-2 px-2">
                                        Not Start
                                    </span>
                                    : <span className="badge badge-warning badge-pill font-weight-bold mx-2 px-2">
                                        END
                                    </span>}
                            </h6>
                            <p className="pb-2 mb-0">{post.eventText}</p>

                            <div className="border-top border-bottom bg-light p-2">

                                <i className="far fa-calendar-times ml-2" />
                                <span className="badge badge-success shadow-sm mx-2 px-2">
                                    {moment(post.eventDate).format('YYYY-MM-DD HH:mm')}
                                </span>

                                <i className="fas fa-map-marker-alt" />
                                <span className="badge badge-success shadow-sm mx-2 px-2">
                                    {post.eventLocation}
                                </span>

                                <i className="fas fa-basketball-ball" />
                                <span className={post.haveBall ? 'badge badge-success shadow-sm mx-2 px-2': 'badge badge-danger shadow-sm mx-2 px-2' }>
                                    {post.haveBall ? 'I will take' : 'Need a ball'}
                                </span>
                                {'  '}

                                <span>
                                    <i className="fas fa-thumbs-up text-info" />
                                    <span className="badge badge-light">
                                        {post.likes.length}
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div className="col-1 py-4 px-1">
                            <h5>
                                <span className="badge badge-white align-middle bg-white w-100">
                                    {post.eventPeopleNumber}
                                </span>
                                <span className="badge badge-primary align-middle mb-2 w-100">
                                    Need
                                </span>
                            </h5>


                            <Link to={`/post/${post._id}`} className="badge badge-secondary badge-pill align-middle w-100">
                                View
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

EventItems.propTypes = {
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
});


export default connect(mapStateToProps)(EventItems);