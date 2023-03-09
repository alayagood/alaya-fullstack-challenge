import {
	ADD_POST,
	ADD_POSTS,
	ADD_POST_PHOTO,
	ADD_POST_PHOTOS,
	DELETE_POST,
} from './PostActions';

const initialState = { data: [], media: [] };

const PostReducer = (previousState, action) => {
	const state = previousState || initialState;

	switch (action.type) {
		case ADD_POST:
			return {
				media: state.media,
				data: [action.post, ...state.data],
			};

		case ADD_POSTS:
			return {
				media: state.media,
				data: action.posts,
			};

		case ADD_POST_PHOTO: {
			return {
				media: [action.media, ...state.media],
				data: state.data,
			};
		}

		case ADD_POST_PHOTOS: {
			return {
				media: action.media,
				data: state.data,
			};
		}

		case DELETE_POST:
			return {
				data: state.data.filter((post) => post.cuid !== action.cuid),
				media: state.media.filter((media) => media.postCuid !== action.cuid),
			};

		default:
			return state;
	}
};

export const getPosts = (state) => state.posts.data;

export const getPost = (state, cuid) =>
	state.posts.data.filter((post) => post.cuid === cuid)[0];

export default PostReducer;
