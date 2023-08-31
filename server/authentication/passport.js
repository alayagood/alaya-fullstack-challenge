const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passport = require('passport');
const passportLocal = require('passport-local');


const User = require('../models/user');

const localStrategy = passportLocal.Strategy;

const encriptionJumps = 10

passport.use('register', 
    new localStrategy (
        {
            usernameField: 'email', 
            passwordField: 'password', 
            passReqToCallback: true
        },
        async ( req, email, password, done ) => {  
            
            try{
                //find user to check if exists
                const  userExists  = await User.findOne({ email: email });
                
                //if user exists an error is retorned
                if( userExists ) {
                    const error = new Error('User already exists');
                    return done(error)
                }
                
                //user password encryption
                const encriptedPassword = await bcrypt.hash(password, encriptionJumps);
                                                            
                //creates a new user
                const newUser = new User({
                    email: email,
                    name: req.body.name,
                    password: encriptedPassword,
                });

                //save the new user
                const createdUser = await newUser.save();

                //return created user hiding de password
                createdUser.password = undefined;

                //ready, user is sent
                done ( null, createdUser );
                
            } catch(err) {
                return done(err);
            }

        }
    )
    
)

passport.use('login', 
    new localStrategy (
        {
            usernameField: 'email', 
            passwordField: 'password', 
            passReqToCallback: true 
        },
        async ( req, email, password, done ) => {  
            try{
                const userExists = await User.findOne({ email: email });
                if(!userExists) {
                    const error = new Error(JSON.stringify({ 
                        message:'User not found', 
                        failed:true 
                    }));
                    return done(error);
                };
                
                const isValidPassword = await bcrypt.compare(password, userExists.password);
                
                if(!isValidPassword) {
                    const error = new Error('Wrong password');
                    return done(error);
                };
                
                userExists.password = undefined;
                
                return done( null, userExists );
 
            } catch(err) {
                return done(err);
            }

        }
    )
    
)

passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    
    passport.deserializeUser(async (userId, done) => {
    try {
        const existingUser = await User.findById(userId);
        done(null, existingUser);
    } catch (err) {
        return done(err);
    }
});