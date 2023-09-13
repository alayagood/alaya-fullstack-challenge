import { Strategy, StrategyOptions } from 'passport-jwt';
import { SECRET_KEY } from '../config';
import User from '../models/user';

const options: StrategyOptions = {
  secretOrKey: SECRET_KEY,
  jwtFromRequest: (req) => {
    const token = req.headers.bearer as string;
    return token;
  },
};


const jwtStrategy = new Strategy(options, async (payload, verify) => {
  const user = await User.findById(payload.id);

  if (user) {
    verify(null, user);
  } else {
    verify(null, undefined, "can't authenticate the user");
  }
});

export default jwtStrategy; 