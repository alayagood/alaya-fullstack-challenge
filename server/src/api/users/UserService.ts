
import { IUser } from '../../models/user';
import { comparePassword, encryptPassword } from './user.helpers';
import CustomError from '../../utils/errors/CustomError';
import IUserService from './interfaces/IUserService';
import ICrudService from '../../database/interfaces/ICrudService';
import availableModels from '../../models';


export default class UserService implements IUserService {
    constructor(private crudService: ICrudService) { }
    authenticateUser = async (email: string, plaintextPassword: string) => {
        const user = await this.crudService.findOne<IUser>(availableModels.user, { email });
        if (!user || ! await comparePassword(plaintextPassword, user.password)) {
            throw new CustomError('Invalid Credentials', 401)
        }
        return user;
    }

    createUser = async (
        email: string,
        password: string,
    ): Promise<IUser> => {
        const encryptedPassword = await encryptPassword(password)
        return this.crudService.createOne<IUser>(availableModels.user, { email, password: encryptedPassword })

    }
}
