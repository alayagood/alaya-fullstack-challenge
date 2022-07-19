import axios from "@/utils/axios";
import { success } from "react-notification-system-redux";
import handleError from "@/utils/error";
import { setLoading } from "@/Loader/Actions";

const API_ENDPOINT = "/posts";

// Export Constants
export const ADD_POST = "ADD_POST";
export const ADD_POSTS = "ADD_POSTS";
export const DELETE_POST = "DELETE_POST";

// Export Actions
export function addPost(post) {
    return {
        type: ADD_POST,
        post
    };
}

export function addPostRequest(post) {
    return async(dispatch) => {
        dispatch(setLoading(true));
        try {
            const res = await axios.post(`${API_ENDPOINT}`, {
                post: {
                    title: post.title,
                    content: post.content,
                    image: post.image
                }
            });

            const successfulOptions = {
                title: `Posted successfully.`,
                message: post.title,
                position: "tr",
                autoDismiss: 5
            };
            dispatch(success(successfulOptions));

            dispatch(addPost(res.data.post));
        } catch (error) {
            const title = `Posting error!`;
            handleError(error, dispatch, title);
        }
        dispatch(setLoading(false));
    };
}

export function addPosts(posts) {
    return {
        type: ADD_POSTS,
        posts
    };
}

export function fetchPosts() {
    return async(dispatch) => {
        dispatch(setLoading(true));
        try {
            const res = await axios.get(`${API_ENDPOINT}`);
            dispatch(addPosts(res.data.posts));
        } catch (error) {
            handleError(error, dispatch);
        }
        dispatch(setLoading(false));
    };
}

export function fetchPost(cuid) {
    return async(dispatch) => {
        dispatch(setLoading(true));
        try {
            const res = await axios.get(`${API_ENDPOINT}/${cuid}`);
            dispatch(addPost(res.data.post));
        } catch (error) {
            handleError(error, dispatch);
        }
        dispatch(setLoading(false));
    };
}

export function deletePost(cuid) {
    return {
        type: DELETE_POST,
        cuid
    };
}

export function deletePostRequest(cuid) {
    return async(dispatch) => {
        dispatch(setLoading(true));
        try {
            await axios.delete(`${API_ENDPOINT}/${cuid}`);
            dispatch(deletePost(cuid));
        } catch (error) {
            const title = `Post delete error!`;
            handleError(error, dispatch, title);
        }
        dispatch(setLoading(false));
    };
}
