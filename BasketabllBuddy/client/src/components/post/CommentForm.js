import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import { addComment } from '../../actions/postActions';
import Spinner from "../common/Spinner";
import isEmpty from "../../validation/is-empty";


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

            <div className="post-form mb-3">
                <div className="card card-info">
                    <div className="card-header bg-info text-white">
                        Make a Comment...
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">

                                <TextFieldGroup
                                    placeholder={auth.isAuthenticated && profileAuth ? "Reply to post": "Please SignUp or Create your profile"}
                                    onChange={this.onChange}
                                    value={this.state.text}
                                    name="text"
                                    error={errors.text}
                                    disabled={!auth.isAuthenticated || !profileAuth}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-dark"
                                disabled={!auth.isAuthenticated || !profileAuth}>
                                Submit
                            </button>
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