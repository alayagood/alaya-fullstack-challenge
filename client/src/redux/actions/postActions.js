import { API_URL } from '../../util/apiCaller';

// Export Constants
export const ADD_POST = 'ADD_POST';
export const ADD_POSTS = 'ADD_POSTS';
export const DELETE_POST = 'DELETE_POST';

// Export Actions
export function addPost(post) {
    return {
        type: ADD_POST,
        post,
    };
}

export function addPostRequest(post) {
    return async (dispatch) => {
        try {
            const response = await fetch(`${API_URL}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ post }),
            });
            const data = await response.json();

            if (response.ok) {
                dispatch(addPost(data.post));
                return data;
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            throw new Error('Failed to add post');
        }
    };
}

export function addPosts(posts) {
    return {
        type: ADD_POSTS,
        posts,
    };
}

export function fetchPosts() {
    return async (dispatch) => {
        try {
            const response = await fetch(`${API_URL}/posts`);
            const data = await response.json();

            if (response.ok) {
                dispatch(addPosts(data.posts));
                return data;
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            throw new Error('Failed to fetch posts');
        }
    };
}

export function fetchPost(cuid) {
    return async (dispatch) => {
        try {
            const response = await fetch(`${API_URL}/posts/${cuid}`);
            const data = await response.json();

            if (response.ok) {
                dispatch(addPost(data.post));
                return data;
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            throw new Error('Failed to fetch post');
        }
    };
}

export function deletePost(cuid) {
    return {
        type: DELETE_POST,
        cuid,
    };
}

export function deletePostRequest(cuid) {
    return async (dispatch) => {
        try {
            const response = await fetch(`${API_URL}/posts/${cuid}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                dispatch(deletePost(cuid));
                return;
            } else {
                throw new Error('Failed to delete post');
            }
        } catch (error) {
            throw new Error('Failed to delete post');
        }
    };
}
