import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/postActions';
import Spinner from "../common/Spinner";
import isEmpty from "../../validation/is-empty";
import classnames from "classnames";


class CommentForm extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            text: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(newProps){
        if(newProps.errors){
            this.setState({errors: newProps.errors});
        }
    }

    onSubmit(e){
        e.preventDefault();
        const { user } = this.props.auth;
        const { postId } = this.props;
        const { profile } = this.props.profile;

        const newComment = {
            text: this.state.text,
            nickName: profile.nickName,
            avatar: user.avatar
        };

        this.props.addComment(postId, newComment);
        this.setState({text: ''})

    };

    onChange(e)
    {
        this.setState({[e.target.name]: e.target.value})
    };
    render() {

        const { errors } = this.state;
        const { auth } = this.props;

        const { profile, loading } = this.props.profile;
        let profileAuth = false;

        if(profile === null || loading )
        {
            return <Spinner />
        }
        else
        {
            if(!isEmpty(profile.nickName))
            {
                profileAuth = true;

            }


        }

        return (

            <div className="comment-form">
                <div className="container m-3 py-3 pl-0 row border rounded shadow-sm bg-light">
                    <div className="col-2">
                        <img
                            src={auth.user.avatar}
                            className="rounded-circle w-100 shadow"
                            alt="niubi"
                        />
                        <p className="font-weight-bold py-2 mb-0">{profile.nickName}</p >
                    </div>
                    <div className="col-10 mt-0 p-0">
                        <form onSubmit={this.onSubmit}>
                            <div className="input-group shadow-sm">
                                <label className="sr-only sr-only-focusable" htmlFor="comments"/>
                                <textarea
                                    className={classnames('form-control rounded-left', {
                                        'is-invalid': errors.text
                                    })}
                                    placeholder={auth.isAuthenticated && profileAuth ? "Enter some comments": "Please SignUp or Create your profile"}
                                    onChange={this.onChange}
                                    name="text"
                                    disabled={!auth.isAuthenticated || !profileAuth}
                                    value={this.state.text}
                                />
                                <div className="input-group-append">
                                    <button
                                        type="submit"
                                        className="btn btn-sm btn-success"
                                        disabled={!auth.isAuthenticated || !profileAuth}>
                                        <i className="fas fa-check"/>
                                    </button>
                                </div>
                                {errors.text && (<div className="invalid-feedback align-content-center">{errors.text}</div>)}
                            </div>
                        </form>
                    </div>
                </div>


            </div>
        );
    }
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    errors:PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, {addComment})(CommentForm);