import { IPost } from "./Post";


export interface IPostState {
    posts: {
        user_posts?: IPost[];
        posts: IPost[];
        errors: boolean,
        loading: boolean,
        empty?: boolean
    }
}