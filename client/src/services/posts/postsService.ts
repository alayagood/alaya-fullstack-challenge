import { AxiosError, AxiosResponse } from "axios";
import { IPost } from "../../interfaces/Post";
import { requestService } from "../requests/requestService";
import storageService from "../storage/storageService";

interface IPostService {
    getPosts(endpoint: string): Promise<IPost[] | IErrorResponse>;
    getUserPosts(endpoint: string, userId: string): Promise<IPost[] | IErrorResponse>;
    getPostByCuid(endpoint: string, cuid: string | undefined): Promise<IPost | IErrorResponse>;
    addPost(endpoint: string, post: FormData): Promise<IPost | IErrorResponse>;
    deletePost(endpoint: string, postId: string): Promise<IPost | IErrorResponse>;
}

export interface IErrorResponse {
    error: boolean;
    message: string;
} 

const postService: IPostService = {

    async getPosts(endpoint: string): Promise<IPost[] | IErrorResponse> {
        try {
          const postsData: AxiosResponse<{ posts: IPost[] }> = await requestService.get(endpoint);
          return postsData.data.posts;
        } catch (error) {
            const err = error as AxiosError;
            const errorResponse: IErrorResponse = {
              error: true,
              message: err.toString(),
            };
            return errorResponse;
        }
      },

    async getUserPosts(endpoint: string, userId: string): Promise<IPost[] | IErrorResponse> {
        try {
            const postsData: AxiosResponse<{ posts: IPost[] }> = await requestService.get(`${endpoint}/${userId}`);
            return postsData.data.posts;
        } catch (error) {
            const err = error as AxiosError
            if(err?.response?.status === 401) {
                storageService.clear('session');
                storageService.clear('local');
            }
            const errorResponse: IErrorResponse = {
                error: true,
                message: err.toString(),
              };
            return errorResponse;
        }
    },

    async getPostByCuid(endpoint: string, cuid: string | undefined): Promise<IPost | IErrorResponse> {
        try {
            const postData: AxiosResponse<{ post: IPost }> = await requestService.get(`${endpoint}/${cuid}`);
            return postData.data.post;
        } catch (error) {
            const err = error as AxiosError;
            const errorResponse: IErrorResponse = {
              error: true,
              message: err.toString(),
            };
            return errorResponse;
        }
    },

    async addPost(endpoint: string, post: FormData): Promise<IPost | IErrorResponse> {
        try {
            const newPostResponse: AxiosResponse<{ post: IPost }> = await requestService.post(endpoint, post, { headers: { 'Content-Type': 'multipart/form-data'}});
            return newPostResponse.data.post;
        } catch (error) {
            const err = error as AxiosError;
            const errorResponse: IErrorResponse = {
              error: true,
              message: err.toString(),
            };
            return errorResponse;
        }
    },

    async deletePost(endpoint: string, postId: string): Promise<IPost | IErrorResponse> {
        try {
          const deletePostResponse: AxiosResponse<{ post: IPost }> = await requestService.delete(`${endpoint}/${postId}`);
          return deletePostResponse.data.post;
        } catch (error) {
          const err = error as AxiosError;
          const errorResponse: IErrorResponse = {
            error: true,
            message: err.toString(),
          };
          return errorResponse;
        }
      }
};

export default postService;