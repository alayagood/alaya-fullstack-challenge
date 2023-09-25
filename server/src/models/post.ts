import mongoose, { Schema, Document, Model } from 'mongoose';
export interface IPost extends Document {
    name: string;
    title: string;
    content: string;
    slug: string;
    cuid: string;
    dateAdded: Date;
    user_id: string
}

const postSchema = new Schema<IPost>({
    name: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    slug: { type: String, required: true },
    cuid: { type: String, required: true },
    dateAdded: { type: Date, default: Date.now, required: true },
    user_id: { type: String, required: true }
});

const Post: Model<IPost> = mongoose.model('Post', postSchema);

export default Post;
