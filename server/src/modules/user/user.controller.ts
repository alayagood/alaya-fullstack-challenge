import { Request, Response } from 'express';

import * as userService from './user.service';
import { shapeUser, signAccessToken, comparePassword } from './user.helpers';
import CustomError from '../../utils/errors/CustomError';
import { accessDataSchema } from './user.schema';

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = accessDataSchema.parse(req.body)

    const user = await userService.getUserByEmail(email);

    if (!user || !comparePassword(password, user.password)) {
        throw new CustomError('Invalid Credentials', 401)
    }
    const accessToken = signAccessToken(user.id, user.role);
    res.status(200).json({ accessToken, user: shapeUser(user) });
};

export const signup = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = accessDataSchema.parse(req.body)

    // Create the user
    const user = await userService.createUser(email, password);
    const accessToken = signAccessToken(user.id, user.role);

    res.status(200).send({ accessToken, user: shapeUser(user) });

};