import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost } from "../../actions/postActions";

class PostItem extends Component{
    onDeleteClick(id){
        this.props.deletePost(id);
    }
    render (){
        const { post, auth } = this.props;
        return(
            <div>
                <img className="" src ={post.avatar} />
                <p className="text-center">{post.name} </p>
                <p className="lead">{post.text} </p>
                <span className="badge badge-light">{post.likes.length} </span>
                <Link to={`./post/${post._id}`} className="" >Comments</Link>
                {post.user === auth.user.id ? (
                    <button onClick={this.onDeleteClick.bind(this.post_id)} type="button" className="btn btn-danger mr-1">
                        <i className="fas fa-times" />
                    </button>
                ):null }
            </div>
        )
    }

}
PostItem.propTypes ={
    deletePost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    auth: state.auth
})

export default connect(mapStateToProps, { deletePost })(PostItem);