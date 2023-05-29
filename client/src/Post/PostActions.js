import callApi from '../util/apiCaller';
import {setApplicationError, setNotificationMessage} from "../components/application/AppActions";

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
    return (dispatch, getState) => {
        const token = getState().user.token;
        return callApi('posts', 'post', {
                post: {
                    name: post.name,
                    title: post.title,
                    content: post.content,
                }
            },
            token.accessToken
        ).then((res) => {
            dispatch(addPost(res.post));
            dispatch(setNotificationMessage('Post created successfully.'));
        });
    };
}

export function addPosts(posts) {
    return {
        type: ADD_POSTS,
        posts,
    };
}

export function fetchPosts() {
    return (dispatch) => {
        return callApi('posts').then(res => {
            dispatch(addPosts(res.posts));
        });
    };
}

export function fetchPost(cuid) {
    return (dispatch) => {
        return callApi(`posts/${cuid}`).then(res => dispatch(addPost(res.post)));
    };
}

export function deletePost(cuid) {
    return {
        type: DELETE_POST,
        cuid,
    };
}

export function deletePostRequest(cuid) {
    return (dispatch, getState) => {
        const token = getState().user.token;
        return callApi(`posts/${cuid}`, 'delete', null, token.accessToken)
            .then(() => {
                dispatch(deletePost(cuid))
                dispatch(setNotificationMessage('The post has been deleted successfully.'));
            })
            .catch((error) => {
                dispatch(setApplicationError(error));
            })
    };
}
