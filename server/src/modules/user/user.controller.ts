import { Request, Response } from 'express';

import * as userService from './user.service';
import { isUserInputValid, shapeUser, signAccessToken, comparePassword } from './user.helpers';
import CustomError from '../../utils/errors/CustomError';

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    if (!isUserInputValid(email, password)) {
        throw new CustomError('Invalid User Data', 400)
    }
    const user = await userService.getUserByEmail(req.body.email);

    if (!user || !comparePassword(password, user.password)) {
        throw new CustomError('Invalid Credentials', 401)
    }
    const accessToken = signAccessToken(user.id, user.role);
    res.status(200).json({ accessToken, user: shapeUser(user) });
};

export const signup = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    if (!isUserInputValid(email, password)) {
        throw new CustomError('Invalid User Data', 400)
    }

    // Create the user
    const user = await userService.createUser(email, password);
    res.status(200).send({ user: shapeUser(user) });

};