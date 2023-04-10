const  User = require('../models/user');
const jwt = require("jsonwebtoken");
const cuid = require('cuid');
const bcrypt = require("bcryptjs");
const config = require("config");

const sanitizeHtml = require('sanitize-html');

/**
 * Save a user
 * @param req
 * @param res
 * @returns void
 */
addUser = async (req, res) => {

  if (!req.body.user.userName || !req.body.user.password) {
    res.status(403).end();
  }
  
  const doesUserExist = await User.findOne({userName: req.body.user.userName});
  if(doesUserExist) {
    res.status(400).end();
  } else {
    const newUser = new User(req.body.user);
    // Let's sanitize inputs
    newUser.newUser = sanitizeHtml(newUser.userName);
    newUser.name = sanitizeHtml(newUser.password);
    newUser.password = await encrypt(newUser.password);
    newUser.cuid = cuid();
    newUser.save((err, saved) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ user: saved });
    });
  }
 
};

/**
 * Login
 * @param req
 * @param res
 * @returns void
 */
loginUser = async (req, res) => {


  if (!req.body.user.userName || !req.body.user.password) {
    res.status(403).end();
  }

  const user = await User.findOne({userName: req.body.user.userName});

  if(user) {
    const validPassword =  await bcrypt.compare(req.body.user.password, user.password);
    if(validPassword){
      const token = generateAuthToken(user);
      res.json({token});
    }
    else {
      // TODO All the errors that can be ocurred on the server side
      // should be managed better than this harcoded example (and the others)
      // we could use a middleware also to parse these errors to the database
      res.status(400).send("Password is incorrect");
    }
  }
  else  {
    res.status(400).send("User does not exist"); 
  }

}

function encrypt(password) {
  return  bcrypt.hash(password, Math.random());
}

function generateAuthToken(user) {
  const token = jwt.sign(
      {
          cuid: user.cuid,
          userName: user.userName
      },
      config.get("jwtPrivateKey")
  );
;

  return token
}




module.exports = {
  addUser,
  loginUser
};
