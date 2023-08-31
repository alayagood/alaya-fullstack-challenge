import { Dispatch } from "redux";
import { IPost } from "../../../interfaces/Post";
import postService, { IErrorResponse } from "../../../services/posts/postsService";
import storageService from "../../../services/storage/storageService";

export const GET_POSTS = 'GET_POSTS';
export const GET_POSTS_OK = 'GET_POSTS_OK';
export const GET_POSTS_ERROR = 'GET_POSTS_ERROR';
export const GET_USER_POSTS = 'GET_USER_POSTS';
export const GET_USER_POSTS_OK = 'GET_USER_POSTS_OK';
export const CREATE_POST = 'CREATE_POST';
export const REMOVE_USER_POSTS = 'REMOVE_USER_POSTS';

export const actionGetPosts = () => ({
  type: GET_POSTS,
});
  
export const actionGetUserPosts = () => ({
  type: GET_USER_POSTS,
});
  

export const actionGetPostsOk = (posts: IPost[] | IErrorResponse) => ({
  type: GET_POSTS_OK,
  payload: posts,
});

export const actionGetUserPostsOk = (posts: IPost[] | IErrorResponse) => ({
  type: GET_USER_POSTS_OK,
  payload: posts,
});
  

export const actionGetPostsError = () => ({
  type: GET_POSTS_ERROR,
});

export const actionCreatePost = (post: IPost) => ({
  type: CREATE_POST,
  payload: post,
});

export const removePost = (cuid: string) => ({
  type: REMOVE_USER_POSTS,
  payload: cuid,
});

export function createNewPost(title: string, content: string, postImgs:FileList | null) {

  const formData = new FormData();
  const images = postImgs as FileList;

  if(images) {
    Array.from(images).forEach( img => {
      formData.append('images', img);
    });
  }

  formData.append('by', storageService.get('local', 'userId'));
  formData.append('title', title);
  formData.append('content', content);

  return async (dispatch: Dispatch) => { 
    try {
      const post = await postService.addPost('posts/add', formData);
      if('title' in post) dispatch(actionCreatePost(post));
      
    } catch (error) {
      dispatch(actionGetPostsError());
    }
  }
}

export function getPosts() {
  return async (dispatch: Dispatch) => {

    dispatch(actionGetPosts());
  
    try {
      const posts = await postService.getPosts('posts');
      if('error' in posts && posts.error) {
        dispatch(actionGetPostsError());
        return
      }
      dispatch(actionGetPostsOk(posts));
    } catch (error) {
      dispatch(actionGetPostsError());
    }
  }
}

export function getUserPosts() {
  return async (dispatch: Dispatch) => {

    dispatch(actionGetUserPosts());

    try {

      const userPosts = await postService.getUserPosts('posts', storageService.get('local', 'userId'));
      dispatch(actionGetUserPostsOk(userPosts));

    } catch (error) {
      dispatch(actionGetPostsError());
    }
  }
}