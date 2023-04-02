const cuid = require('cuid');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const SECRET = process.env.JWT_SECRET;
const JWT_COOKIE = process.env.JWT_COOKIE;

/**
 * Create a user
 * @param req
 * @param res
 * @returns void
 */
createUser = async (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.name) {
    return res.status(400).json({mesage: 'wrong params email password or name'});

  }

  const currentUser = await User.findOne({email: req.body.email});

  if (currentUser) {
    return res.status(409).end();
  }

  const user = new User(req.body);

  user.id = cuid();

  user.save((err) => {
    if (err) {
      return res.status(500).send(err);
    }

    return res.status(201).json({message: 'success'});
  });
};


/**
 * Login a user
 * @param req
 * @param res
 * @returns void
 */
loginRequest = async (req, res) => {
  const {email, password} = req.body

  if (!email || !password) {
    return res.status(400).end();
  }

  const user = await User.findOne({email});

  if (!user) {
    return res.status(400).end();
  }

  const validPassword = await user.verifyPassword(password);

  if (!validPassword) {
    return res.status(400).end();
  }

  const jwtToken = jwt.sign({id: user.id, email: user.email}, SECRET);

  res.cookie(JWT_COOKIE, jwtToken, {httpOnly: true, maxAge: 1000000});
  res.status(200).json({token: jwtToken})
};

/**
 * Validate a token
 * @param req
 * @param res
 * @returns void
 */
validateUserToken = (req, res, next) => {
  const token = req.cookies[JWT_COOKIE];
  if (!token) {
    return res.status(401).end();
  }

  try {
    const user = jwt.verify(token, SECRET);
    req.context = {user};
    next();
  } catch (e) {
    res.status(401).end();
  }
};


module.exports = {
  createUser,
  loginRequest,
  validateUserToken
};
