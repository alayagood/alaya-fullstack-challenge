import callApi from '../util/api';

export const ADD_POST = 'ADD_POST';
export const ADD_POSTS = 'ADD_POSTS';
export const ADD_POST_PHOTO = 'ADD_POST_PHOTO';
export const DELETE_POST = 'DELETE_POST';

export function addPost(post) {
	return {
		type: ADD_POST,
		post,
	};
}

export function addPostRequest(post) {
	return (dispatch) =>
		callApi({
			endpoint: 'posts',
			method: 'post',
			body: {
				post: {
					name: post.name,
					title: post.title,
					content: post.content,
				},
			},
		}).then((res) => dispatch(addPost(res.post)));
}

export function addPosts(posts) {
	return {
		type: ADD_POSTS,
		posts,
	};
}

export function addPhoto(post) {
	return {
		type: ADD_POST_PHOTO,
		post,
	};
}

export function fetchPosts() {
	return (dispatch) =>
		callApi({
			endpoint: 'posts',
		}).then((res) => {
			dispatch(addPosts(res.posts));
		});
}

export function fetchPost(cuid) {
	return (dispatch) =>
		callApi({
			endpoint: `posts/${cuid}`,
		}).then((res) => dispatch(addPost(res.post)));
}

export function uploadPostPhoto(post, file) {
	return (dispatch) =>
		callApi({
			endpoint: `posts/${post.cuid}/upload`,
			method: 'post',
			files: [file],
		}).then((res) => dispatch(addPost(res.post)));
}

export function deletePost(cuid) {
	return {
		type: DELETE_POST,
		cuid,
	};
}

export function deletePostRequest(cuid) {
	return (dispatch) =>
		callApi({
			endpoint: `posts/${cuid}`,
			method: 'delete',
		}).then(() => dispatch(deletePost(cuid)));
}
