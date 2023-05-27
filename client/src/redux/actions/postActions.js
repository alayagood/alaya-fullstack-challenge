import callApi from '../../util/apiCaller';

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
            const response = await callApi('posts', 'post', {
                post: {
                    name: post.name,
                    title: post.title,
                    content: post.content,
                },
            });
            dispatch(addPost(response.data.post));
        } catch (error) {
            console.error('Failed to add post:', error);
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
            const response = await callApi('posts');
            dispatch(addPosts(response.data.posts));
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        }
    };
}

export function fetchPost(cuid) {
    return async (dispatch) => {
        try {
            const response = await callApi(`posts/${cuid}`);
            dispatch(addPost(response.data.post));
        } catch (error) {
            console.error('Failed to fetch post:', error);
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
    return (dispatch) => {
        return callApi(`posts/${cuid}`, 'delete')
            .then(() => {
                dispatch(deletePost(cuid));
                return { success: true };
            })
            .catch((error) => {
                console.error('Failed to delete post:', error);
                throw new Error('Failed to delete post');
            });
    };
}