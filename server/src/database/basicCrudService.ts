export default interface BasicCrudService {
    createOne(model: any, data: object, raw?: boolean): Promise<any>;
    findMany(model: any, offset?: number, filter?: any, limit?: number): Promise<any[]>;
    getRecordsWithCount(
        model: any,
        offset?: number,
        filter?: any,
        limit?: number,
    ): Promise<{ count: number; rows: any[] }>;
    getOneById(model: any, id: number): Promise<any>;
    deleteOneById(model: any, id: number): Promise<any | number>;
    updateOneById(model: any, newData: object, id: number): Promise<any>;
    bulkCreate(model: any, data: object[], options?: object): Promise<any>;
}
