import IPostService from "./interfaces/IPostService";
import ICrudService from '../../database/interfaces/ICrudService';
import { IPost } from '../../models/post';
import { AddPostSchema } from "./post.schema";
import CustomError from '../../utils/errors/CustomError';
import { cloudinary } from "../../middlewares/multerCloudinary";
import availableModels from '../../models/index';

class PostService implements IPostService {

  constructor(private crudService: ICrudService) { }

  async getPosts(): Promise<IPost[]> {
    return this.crudService.findMany<IPost>(availableModels.post, {}, '-dateAdded');
  }

  async addPost({ title, name, content, fileOriginalName, filePath }: AddPostSchema, userId: string): Promise<IPost> {
    return this.crudService.createOne(availableModels.post, { title, name, content, fileOriginalName, filePath, user: userId });
  }

  async getPost(cuid: string): Promise<IPost | null> {
    return this.crudService.findOne(availableModels.post, { cuid });
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

    return this.crudService.deleteOne(availableModels.post, { cuid });
  }
  // We could add other more complex operations using crudservice operation or accessing the model directly
  // async otherOperation(params: any) {
  //   1.accessing the model:
  //   const model = this.crudService.getModel(model)
  //   2. using the cruds service operation :
  //   this.crudService.otherOperation(model)
  // }

}
export default PostService;
