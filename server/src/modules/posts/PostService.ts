import Post, { IPost } from '../../models/post';
import CustomError from '../../utils/errors/CustomError';
import { cloudinary } from '../../middlewares/multerCloudinary';
import IPostService from './interfaces/IPostService';

import { AddPostSchema } from './post.schema';

class PostService implements IPostService {
  async getPosts(): Promise<IPost[]> {
    return Post.find().sort('-dateAdded');
  }

  async addPost({ title, name, content, fileOriginalName, filePath }: AddPostSchema, userId: string): Promise<IPost> {
    const newPost: IPost = new Post({ title, name, content, fileOriginalName, filePath, user_id: userId });
    return newPost.save();
  }

  async getPost(cuid: string): Promise<IPost | null> {
    return Post.findOne({ cuid });
  }

  async deletePost(cuid: string, userId: string): Promise<IPost | null> {

    const post = await this.getPost(cuid);
    if (!post) {
      return null;
    }

    if (post.user_id !== userId) {
      throw new CustomError('User cant delete other user posts', 403);
    }

    if (post.fileOriginalName) {
      await cloudinary.uploader.destroy(post.fileOriginalName);
    }

    return post.deleteOne();


  }
}

export default PostService;
