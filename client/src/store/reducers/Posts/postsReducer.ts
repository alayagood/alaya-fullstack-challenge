import { IPost } from "../../../interfaces/Post";
import storageService from "../../../services/storage/storageService";
import * as actions from "../../actions/Posts/postActions";

interface IPostState {
  posts: IPost[],
  user_posts: IPost[],
  errors: boolean,
  loading: boolean,
  empty: boolean
}

export const initialState: IPostState = {
    posts: [],
    user_posts: [],
    errors: false,
    loading: false,
    empty: false
};


export interface IAction<T, P> {
  readonly type: T;
  readonly payload?: P;
}
  
  export default function postReducer(state: IPostState = initialState, action: IAction<string, IPost | IPost[]>) {
    switch (action.type) {
        case actions.GET_POSTS:
            return { 
              ...state, 
              loading: true
            };

        case actions.GET_USER_POSTS:
            return { 
              ...state, 
              loading: true 
            };
        case actions.GET_USER_POSTS_OK:
          return { 
            ...state,
            user_posts: action.payload,  
            loading: false, 
            errors: false,
            empty: Array.isArray(action.payload) && action.payload?.length ? false : true
          };
          
        case actions.GET_POSTS_OK:
            return { 
              posts: action.payload, 
              loading: false, 
              errors: false 
            };
        case actions.GET_POSTS_ERROR:
            return { 
              ...state, 
              loading: false, 
              errors: true 
            };
        case actions.CREATE_POST:
          if(action.payload && !Array.isArray(action.payload)) {
            action.payload.by = {
              _id: storageService.get('local', 'userId'),
              name: storageService.get('local', 'userName')
          };
          }

          return { 
            ...state, 
            user_posts: [...state.user_posts, action.payload],
            loading: false, 
            errors: false 
          };   
        case actions.REMOVE_USER_POSTS:
          return { 
            ...state,
            user_posts: [...state.user_posts.filter(post => post.cuid !== action.payload )], 
          };      
        default:
          return state;
    }
  }