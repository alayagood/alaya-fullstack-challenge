import cuid from 'cuid';
import slug from 'limax';
import Post, { IPost } from '../../models/post';
import CustomError from '../../utils/errors/CustomError';

export const getPosts = async (): Promise<IPost[]> => {
    return Post.find().sort('-dateAdded');
}

export const addPost = async (post: { name: string, title: string, content: string }, userId: string): Promise<IPost> => {
    const newPost: IPost = new Post({ ...post, user_id: userId });

    newPost.slug = slug(newPost.title.toLowerCase());
    newPost.cuid = cuid();

    return newPost.save();
}

export const getPost = async (cuid: string): Promise<IPost | null> => {
    return Post.findOne({ cuid });
}

export const deletePost = async (cuid: string, userId: string): Promise<{ deletedCount: number }> => {
    const post = await Post.findOne({ cuid });
    if (!post) {
        return { deletedCount: 0 };
    }

    if (post.user_id !== userId) {
        throw new CustomError('User cant delete other user posts', 403);
    }
    return Post.deleteOne({ cuid });
}