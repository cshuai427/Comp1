import { ADD_POST, GET_POSTS, POST_LOADING, DELETE_POST, GET_POST } from "../actions/types";

const initialState = {
    posts: [],
    post: [],
    loading: false,
    currentPage: null,
    totalPages: null
};

// Save post or posts state to redux
export default function (state = initialState, action) {
    switch (action.type) {
        case POST_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_POST:
            return {
                ...state,
                post: action.payload,
                loading: false
            };
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload.posts,
                loading: false,
                currentPage: action.payload.currentPage,
                totalPages: action.payload.totalPages
            };
        case ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            };
        case DELETE_POST:
            return{
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload)
            };
        default:
            return state;
    }
}