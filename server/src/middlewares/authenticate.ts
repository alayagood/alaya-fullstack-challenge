import type { Handler } from 'express';
import passport from 'passport';
import { IUser, Role } from '../models/user';


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

          return res.status(401).send({ message: "Unauthorized" });
        }

        if (roles) {
          const isAllowed = roles.some((role) => user.role === role);
          if (!isAllowed) {
            return res.status(401).json({ message: "Unauthorized" });
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
