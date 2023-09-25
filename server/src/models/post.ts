import mongoose, { Schema, Document, Model } from 'mongoose';
import slug from 'limax';
import cuid from 'cuid';
import { IUser } from './user';
// import { IUser } from 'src/models/user';
export interface IPost extends Document {
    name: string;
    title: string;
    content: string;
    filePath?: string;
    fileOriginalName?: string;
    slug: string;
    cuid: string;
    dateAdded: Date;
    user: IUser['_id']
}

const postSchema = new Schema<IPost>({
    name: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    filePath: { type: String, required: false },
    fileOriginalName: { type: String, required: false },
    slug: { type: String, required: true },
    cuid: { type: String, required: true, index: true, unique: true },
    dateAdded: { type: Date, default: Date.now, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

postSchema.pre("validate", function (next) {
    this.slug = slug(this.title.toLowerCase());
    this.cuid = cuid()
    next();
});

const Post: Model<IPost> = mongoose.model('Post', postSchema);

export default Post;
