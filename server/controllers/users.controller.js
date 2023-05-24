const Users = require('../models/users');
const cuid = require('cuid');
const slug = require('limax');
const sanitizeHtml = require('sanitize-html');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport= require('passport');
const localStrategy = require('passport-local').Strategy;

/**
 * Save a post
 * @param usersname
 * @param password
 * @param done
 * @returns void
 */
createUser = async (usersname, password, done) => {
console.log("usersname" + usersname)
  const hashedPassword = await bcrypt.hash(password, 10);
  //const hashedPassword = password;
  const newUser = new Users({usersname, password: hashedPassword});
    try {
      await newUser.save();
      return done(null, newUser);
    } catch (error) {
      return done(error);
    }
  };

  
  /**
 * Save a post
 * @param usersname
 * @param password
 * @param done
 * @returns void
 */
validateUser = async (usersname, password, done) => {
  try{
    const validUser = await Users.findOne({usersname});

    if(!validUser){
      const error = new Error('Incorrect email or password');
      error.name = 'IncorrectCredentialsError';
      return done(error);
    }

    const isPasswordValid = await bcrypt.compare(password, validUser.password);

    if(!isPasswordValid){
      const error = new Error('Incorrect email or password');
      error.name = 'IncorrectCredentialsError';

      return done(error);
    }


    return done(null, jwt.sign({ validUser}, 'TOP_SECRET'), { usersname, message: 'Logged in Successfully' });
  }catch (error) {
    return done(error);
  }
};

 /**
 * Get all users
 * @param req
 * @param res
 * @returns void
 */
 listUsers = async (req, res) => {
  Users.find().exec((err, posts) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ posts });
  });
};
  
module.exports = {
    createUser,
    validateUser,
    listUsers,
  };