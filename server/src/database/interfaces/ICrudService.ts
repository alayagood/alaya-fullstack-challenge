

export default interface ICrudService {
  getModel<T>(model: string): T;
  createOne<T>(model: string, data: object): Promise<T>;
  deleteOne<T>(model: string, query: any): Promise<T | any>;
  findOne<T>(model: string, query: any): Promise<T>;
  findMany<T>(model: string, query: any, sort: any): Promise<T[]>;
}
