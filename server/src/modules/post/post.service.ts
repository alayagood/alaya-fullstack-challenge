
import Post, { IPost } from '../../models/post';
import CustomError from '../../utils/errors/CustomError';
import { cloudinary } from '../../middlewares/multerCloudinary';
import { AddPostSchema } from './post.schema';


export const getPosts = async (): Promise<IPost[]> => {
    return Post.find().sort('-dateAdded');
}

export const addPost = async ({ title, name, content, fileOriginalName, filePath }: AddPostSchema, userId: string): Promise<IPost> => {
    const newPost: IPost = new Post({ title, name, content, fileOriginalName, filePath, user_id: userId });
    return newPost.save();
}

export const getPost = async (cuid: string): Promise<IPost | null> => {
    return Post.findOne({ cuid });
}

export const deletePost = async (cuid: string, userId: string): Promise<IPost | null> => {
    const post = await Post.findOne({ cuid });
    if (!post) {
        return null;
    }

    if (post.user_id !== userId) {
        throw new CustomError('User cant delete other user posts', 403);
    }
    if (post.fileOriginalName) {
        await cloudinary.uploader.destroy(post.fileOriginalName)
    }
    // We are assuming this operation will not fail, but on a production app we should handle the atomicity of operations since the cloudinary delete depends on the post deletion
    return post.deleteOne();
}