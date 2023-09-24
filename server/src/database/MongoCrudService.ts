import { Model, Document } from 'mongoose';
import IDatabase from './interfaces/IDatabase';
import ICrudService from './interfaces/ICrudService';
import availableModels from '../models';

class MongoCrudService implements ICrudService {
  constructor(private database: IDatabase) { }

  public getModel = <T>(model: availableModels): T => {
    return this.database.getModel<T>(model)
  }

  async createOne(model: availableModels, data: any): Promise<any> {
    const currentModel = this.getModel<Model<Document>>(model)
    const newEntity = new currentModel(data);
    return newEntity.save();
  }
  async deleteOne(model: availableModels, query: any): Promise<any> {
    const currentModel = this.getModel<Model<Document>>(model)
    return currentModel.deleteOne(query)
  }
  async findOne(model: availableModels, query: any): Promise<any> {
    const currentModel = this.getModel<Model<Document>>(model)
    return currentModel.findOne(query);
  }
  async findMany(model: availableModels, query: any, sort = '-dateAdded'): Promise<any[]> {
    const currentModel = this.getModel<Model<Document>>(model)
    return currentModel.find(query).sort(sort);
  }
  // async otherOperation(model: any) {
  //   const model = this.crudService.getModel<Model<IPost>>(model)
  // }

}

export default MongoCrudService;
