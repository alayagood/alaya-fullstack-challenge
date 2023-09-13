import jwt from 'jsonwebtoken';
import * as EmailValidator from 'email-validator';
import bcrypt from 'bcryptjs';

import { SECRET_KEY, JWT_ACCESS_TOKEN_LIFETIME, SALT_ROUNDS } from '../../config';
import { IUser } from '../../models/user';


export type UserShape = {
  email: string
  role: string
  _id: string
  dateAdded: string
};

export const shapeUser = (user: IUser): UserShape => {
  return {
    email: user.email,
    role: user.role,
    _id: user._id,
    dateAdded: user.dateAdded.toISOString()
  }
}
export const comparePassword = (password: string, hashedPassword: string): boolean => {
  return !bcrypt.compareSync(password, hashedPassword)
}

export const signAccessToken = (id: string, role: string) => {
  const accessToken = jwt.sign({ id, role }, SECRET_KEY, {
    expiresIn: JWT_ACCESS_TOKEN_LIFETIME,
  });

  return accessToken;
};

export const encryptPassword = (password: string): string => {
  return bcrypt.hashSync(password, SALT_ROUNDS);
}

export const isUserInputValid = (email: string, password: string): boolean => {
  if (!email || !password) {
    return false
  }
  // Password must be at least 6 characters long (other rules could be applied)
  if (password.length < 6) return false
  // 
  return EmailValidator.validate(email);

}
