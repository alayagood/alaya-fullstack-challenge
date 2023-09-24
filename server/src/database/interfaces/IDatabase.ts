
export default interface IDatabase {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  models: any;
  getModel: <T>(model: string) => T
  getConnection: any
}
