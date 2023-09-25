const DI_TYPES = {
  CrudService: Symbol.for('CrudService'),
  Database: Symbol.for('Database'),
  PostService: Symbol.for('PostService'),
  UserService: Symbol.for('UserService')
};

export default DI_TYPES;
