import type { Handler } from 'express';
import passport from 'passport';

import { IUser, Role } from '../models/user';
import CustomError from '../utils/errors/CustomError';


const authenticate = (roles?: Role[]) => {
  const handler: Handler = (req, res, next) => {
    passport.authenticate('jwt',
      { session: false },
      (error: any, user: IUser) => {
        if (error) {
          return res.status(500).send({
            detail: "Server error",
          });
        }
        if (!user) {
          throw new CustomError('Unauthorized', 401)
        }
        // check if user has the right role (right now this is useless but here is where we could check that)
        if (roles) {
          const isAllowed = roles.some((role) => user.role === role);
          if (!isAllowed) {
            throw new CustomError('Unauthorized', 401)
          }
        }
        req.user = user;
        return next();
      }
    )(req, res, next);
  };

  return handler;
};

export default authenticate;
