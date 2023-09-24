
import User, { IUser } from '../../models/user';
import { comparePassword, encryptPassword } from './user.helpers';
import CustomError from '../../utils/errors/CustomError';
import IUserService from './interfaces/IUserService';


export default class UserService implements IUserService {

    authenticateUser = async (email: string, plaintextPassword: string) => {
        const user = await User.findOne({ email });
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
        return User.create({ email, password: encryptedPassword });
    }
}
