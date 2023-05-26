import { ADD_POST, ADD_POSTS, DELETE_POST } from '../actions/postActions';

const initialState = {
    data: [],
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                data: [action.post, ...state.data],
            };

        case ADD_POSTS:
            return {
                ...state,
                data: action.posts,
            };

        case DELETE_POST:
            return {
                ...state,
                data: state.data.filter((post) => post.cuid !== action.cuid),
            };

        default:
            return state;
    }
};

export default postReducer;

export const getPosts = (state) => state.posts.data;
export const getPost = (state, cuid) =>
    state.posts.data.find((post) => post.cuid === cuid);
