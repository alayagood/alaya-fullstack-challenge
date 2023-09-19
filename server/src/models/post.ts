import mongoose, { Schema, Document, Model } from 'mongoose';
import slug from 'limax';
import cuid from 'cuid';
export interface IPost extends Document {
    name: string;
    title: string;
    content: string;
    filePath?: string;
    fileOriginalName?: string;
    slug: string;
    cuid: string;
    dateAdded: Date;
    user_id: string
}

const postSchema = new Schema<IPost>({
    name: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    filePath: { type: String, required: false },
    fileOriginalName: { type: String, required: false },
    slug: { type: String, required: true },
    cuid: { type: String, required: true },
    dateAdded: { type: Date, default: Date.now, required: true },
    user_id: { type: String, required: true }
});

postSchema.pre("validate", function (next) {
    this.slug = slug(this.title.toLowerCase());
    this.cuid = cuid()
    next();
});

const Post: Model<IPost> = mongoose.model('Post', postSchema);

export default Post;
