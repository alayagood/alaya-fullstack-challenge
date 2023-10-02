import { Model } from "mongoose";
import MongoCrudService from "./MongoCrudService";
import { IPost } from '../../models/post';
import { IUser } from '../../models/user';
import { IDataService } from "../interfaces/IDataService";
import IDatabase from "../interfaces/IDatabase";
import availableModels from '../../models/index';


export default class MongoDataService implements IDataService {
  post: MongoCrudService<IPost>;
  user: MongoCrudService<IUser>;
  constructor(public database: IDatabase) {
    const postModel = this.database.getModel<Model<IPost>>(availableModels.post);
    const userModel = this.database.getModel<Model<IUser>>(availableModels.user);
    this.post = new MongoCrudService<IPost>(postModel);
    this.user = new MongoCrudService<IUser>(userModel);
  }
}
