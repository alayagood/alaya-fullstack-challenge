
import { AddPostSchema } from '../post.schema';
import { IPost } from '../../../models/post';

interface IPostService {
  getPosts(): Promise<IPost[]>;
  addPost(data: AddPostSchema, userId: string): Promise<IPost>;
  getPost(cuid: string): Promise<IPost | null>;
  deletePost(cuid: string, userId: string): Promise<IPost | null>;
}

export default IPostService;
