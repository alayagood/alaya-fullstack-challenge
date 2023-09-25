
import User, { IUser } from '../../models/user';
import { encryptPassword } from './user.helpers';

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
    return User.findOne({ email });
};

export const createUser = async (
    email: string,
    password: string,
): Promise<IUser> => {
    const encryptedPassword = encryptPassword(password)
    return User.create({ email, password: encryptedPassword });
};
