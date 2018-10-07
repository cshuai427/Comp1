import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profileActions';
import FriendItem from './FriendItem';
import Spinner from '../common/Spinner'
import axios from "axios";

function searchingFor(term){
    return function (x) {
        return x.first.toLowerCase().includes(term.toLowerCase()) || !term;

    }
}
class FriendList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchContent: "",
            friendItems: [],
            term:''
        };
        this.onChange = this.onChange.bind(this); // ！


    }

    componentDidMount(){
        this.props.getProfiles();
    }
    onChange(e) {
       // this.setState({ [e.target.name]: e.target.value });
        this.setState({ term: e.target.value });




    }

    render(){
        const { profiles, loading } = this.props.profile;
        const { user } = this.props.auth;


        let friendItems;


        if(profiles === null || loading) {
             friendItems = <Spinner />;
        }
        else
        {

            if(profiles.length > 0){
                friendItems = profiles.filter(searchingFor(this.state.term)).map(profile =>{
                       return(
                           <li
                               className="dropdown-item list-item-group"
                               //key={index}
                               onClick={this.onClickTitle}
                               value={profile.nickName}
                           >
                               {profile.nickName}
                           </li>
                       )

               }
                    // (
                    //
                    //     // Remove login user from list
                    //     profile.nickName && profile.user ?
                    //         <FriendItem key={profile._id} profile={profile} />
                    //         : null
                    //
                    // )



                );
            }
            else
            {
                friendItems = <h4>No profiles found...</h4>
            }
        }


        return(
            <div className="col-sm-2 col-auto sidenav bg-secondary">

                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        <i className="fa fa-search"/>
                        <input type="text" className="bg-light"
                               name="searchContent"
                               autoComplete="off"
                               required
                               value={this.state.searchContent}
                               onChange={this.onChange}

                        />
                    </li>

                    {friendItems}
                </ul>
            </div>
        );
    }

}

FriendList.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(FriendList);