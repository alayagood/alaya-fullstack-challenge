import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';
import Post, { IPost } from '../../models/post';
import CustomError from '../../utils/errors/CustomError';
import { cloudinary } from '../../middlewares/multerCloudinary';


export const getPosts = async (): Promise<IPost[]> => {
    return Post.find().sort('-dateAdded');
}

export const addPost = async (post: { name: string, title: string, content: string, filePath?: string, fileOriginalName?: string }, userId: string): Promise<IPost> => {
    const newPost: IPost = new Post({ ...post, user_id: userId });
    newPost.title = sanitizeHtml(newPost.title);
    newPost.name = sanitizeHtml(newPost.name);
    newPost.content = sanitizeHtml(newPost.content);
    newPost.slug = slug(newPost.title.toLowerCase());
    newPost.cuid = cuid();

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