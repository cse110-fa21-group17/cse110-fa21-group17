const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt-nodejs");

const usersModel = require('../database/models/usersModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', async function(req, res, next){
  res.render('pages/login', {title: 'Log In'});
});

router.post('/login', async function(req, res, next){
  try {

    const user = req.body;
    const user_in_db = await usersModel.getByEmail(user.email);

    if(user_in_db.length === 0){
      // eventually need to make a better page and redirect them to signup.
      return res.status(401)
          .json({status: 'failed', message: 'Email not found, user does not exist in database'});
    }

    // TODO: add password comparison bcrypt.compareSync(user.password, user_in_db[0].password) returns boolean
    // TODO: include the auth/token.js file, call the generate token use await and store it in a token variable
    // TODO: add it in cookie, but first clear cookie, then add it under the key userInfo
    // ex: res.clearCookie('userInfo');
    //     res.cookie("userInfo", token);


  } catch (err){
    console.error(err);
    return res.status(500)
        .json({err, data: 'Unable to signup user, internal server error'});
  }
});

router.get('/signup', async function(req, res, next){
  res.render('pages/signup', {title: 'Sign Up'});
});

router.post('/signup', async function(req, res, next){
  try {

    // get user from frontend
    const new_user = req.body;
    const users = await usersModel.getByEmail(new_user.email);

    // check if user with the same email exists
    if (users.length!==0) {
      return res.status(401)
          .json({status: 'failed', message: 'Another account using this email was found'});
    }

    //encrypt password
    new_user.password = bcrypt.hashSync(new_user.password, null, null);

    // insert user
    await usersModel.insert(new_user);
    return res.render('pages/signupSuccess', {title: 'Sign Up Successful'});
  } catch(err){
    console.error(err);
    return res.status(500)
        .json({err, data: 'Unable to signup user, internal server error'});
  }
});

module.exports = router;
