import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from '../../validation/is-empty';

// Should be removed
import basketball1 from "../../Img/basketball1.jpeg";
import basketball2 from "../../Img/basketball2.jpg";

// components
import { getPosts } from '../../actions/postActions';
import Spinner from '../common/Spinner';


////  all event items
import EventFeed from './EventFeed';
import basketballBanner from '../../Img/basketballBanner.jpg';

class Event extends Component {

    componentDidMount() {
        if (this.props.page) {
            this.props.getPosts(this.props.page);
        }
    }

    render() {
        const { posts, loading, totalPages } = this.props.post;
        let postContent;
        if(isEmpty(posts) || loading)
            postContent = <Spinner/>;
        else
            postContent = <EventFeed posts={posts}/>;


        let pagination = null;
        if (totalPages > 1) {
            let currentPage = this.props.page;
            let firstPage, lastPage;
            let pageArray = [];

            if (currentPage === "1") {
                firstPage = (
                    <li className="page-item disabled">
                        <a className="page-link text-dark">
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only"> First </span>
                        </a >
                    </li>
                );
            } else {
                firstPage = (
                    <li className="page-item">
                        <a className="page-link text-dark" href= "/1">
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only"> First </span>
                    </a >
                    </li>
                );
            }

            if (parseInt(currentPage, 10) === parseInt(totalPages, 10)) {
                lastPage = (
                    <li className="page-item disabled">
                        <a className="page-link text-dark">
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only"> Last </span>
                        </a >
                    </li>
                );
            } else {
                lastPage = (
                    <li className="page-item">
                        <a className="page-link text-dark" href={`/${totalPages}`}>
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only"> Last </span>
                        </a >
                    </li>
                );
            }

            let i = currentPage > 4 ? currentPage - 3 : 1;
            for (i; i <= parseInt(currentPage, 10) + 3 && i <= parseInt(totalPages, 10); i++) {
                if (i === parseInt(currentPage, 10)) {
                    pageArray.push(
                        <li className="page-item active" key={i}>
                            <a className="page-link text-dark">{i}</a >
                        </li>
                    );
                } else {
                    pageArray.push(
                        <li className="page-item" key={i}>
                            <a className="page-link text-dark" href={`/${i}`}>{i}</a >
                        </li>
                    );
                }
            }

            pagination = (
                <ul className="pagination text-center justify-content-center">
                    {firstPage}
                    {pageArray}
                    {lastPage}
                </ul>
            );
        }

        return(
            <div className="Event">
                <div className="banner">
                    < img className="tp-bgimg defaultimg col-sm-12 col-lg-12 col-md-12 col-xs-12 nopadding img-responsive img-thumbnail pull-left"
                          src={basketballBanner}
                          style={{position:'center', height:'100%', width:'100%'}}
                          alt="Responsive image"
                    />
                </div>
                <h1>Basketball Meetup Events</h1>
                <hr />
                <div>
                    < img src={ basketball1 } width="200" height="100"  />
                    <h3>Saturday Event -test 1</h3>
                    <p>Hello everyone, this Saturday I will play basketball at central. Anyone has time could join me. Welcome <a href=" "> View</a ></p >
                    <hr/>
                    <h3>Sunday Event -test 2</h3>
                    <p>Hello everyone, this Saturday I will play basketball at central. Anyone has time could join me. Welcome<a href="/event/commit"> View</a ></p >
                    <hr/>
                    < img src={ basketball2 } width="200" height="100"  />
                    <h3>Saturday Event -test 3</h3>
                    <p>Hello everyone, this Saturday I will play basketball at central. Anyone has time could join me. Welcome <a href="/event/commit"> View</a ></p >
                    <hr/>
                    {postContent}
                    <br />
                    {pagination}
                </div>
            </div>
        );
    }
}

Event.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = state =>({
    post: state.post
});

export default connect(mapStateToProps, {getPosts})(Event);