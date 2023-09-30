import IPostService from "./interfaces/IPostService";

import { IPost } from '../../models/post';
import { AddPostSchema } from "./post.schema";
import CustomError from '../../utils/errors/CustomError';
import { cloudinary } from "../../middlewares/multerCloudinary";
import { IDataService } from "src/database/interfaces/IDataService";

class PostService implements IPostService {

  constructor(private dataService: IDataService) { }

  async getPosts(): Promise<IPost[]> {
    return this.dataService.post.findMany({}, '-dateAdded');
  }

  async addPost({ title, name, content, fileOriginalName, filePath }: AddPostSchema, userId: string): Promise<IPost> {
    return this.dataService.post.createOne({ title, name, content, fileOriginalName, filePath, user: userId });
  }

  async getPost(cuid: string): Promise<IPost | null> {
    return this.dataService.post.findOne({ cuid });
  }

  async deletePost(cuid: string, userId: string): Promise<IPost | null> {
    const post = await this.getPost(cuid);
    if (!post) {
      return null;
    }
    // Here you could compare use the native mongo "post.user.equals(userId)" for comparison , but I wanted to keep the service agnostic from the database language.
    if (String(post.user) !== String(userId)) {
      throw new CustomError('User cant delete other user posts', 403);
    }

    if (post.fileOriginalName) {
      await cloudinary.uploader.destroy(post.fileOriginalName);
    }

    return this.dataService.post.deleteOne({ cuid });
  }
}
export default PostService;
