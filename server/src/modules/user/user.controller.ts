import { Request, Response } from 'express';

import * as userService from './user.service';
import { isUserInputValid, shapeUser, signAccessToken, comparePassword } from './user.helpers';



export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    if (!isUserInputValid(email, password)) {
        res.status(400).send({ detail: 'Invalid User Data' });
        return
    }
    try {
        const user = await userService.getUserByEmail(req.body.email);

        if (!user || !comparePassword(password, user.password)) {
            res.status(400).send({ detail: 'Login Failed' });
            return
        }
        const accessToken = signAccessToken(user.id, user.role);
        res.status(200).json({ accessToken, user: shapeUser(user) });
    } catch (err) {
        res.status(500).send(err);
    }
};

export const signup = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    if (!isUserInputValid(email, password)) {
        res.status(400).send({ detail: 'Invalid User Data' });
        return
    }
    try {
        // Create the user
        const user = await userService.createUser(email, password);
        res.status(200).send({ user: shapeUser(user) });
    } catch (error: any) {
        res.status(500).send({ message: error.message });
    }
};