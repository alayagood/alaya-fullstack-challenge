import Post, { IPost } from '../../models/post';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

export const getPosts = async (): Promise<IPost[]> => {
    return Post.find().sort('-dateAdded');
}

export const addPost = async (post: { name: string, title: string, content: string }): Promise<IPost> => {
    const newPost: IPost = new Post(post);
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

export const deletePost = async (cuid: string): Promise<{ deletedCount: number }> => {
    return Post.deleteOne({ cuid });
}