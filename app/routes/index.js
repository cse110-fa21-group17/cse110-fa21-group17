const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');

const usersModel = require('../database/models/usersModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', async function(req, res, next){
  res.render('pages/login', {title: 'Log In'});
});

router.post('/login', async function(req, res, next){
  // TODO: fill in login logic
});

router.get('/signup', async function(req, res, next){
  res.render('pages/signup', {title: 'Sign Up'});
});

router.post('/signup', async function(req, res, next){
  try {
    const new_user = req.body;
    const users = await usersModel.getByEmail(new_user.email);
    if (users.length!==0) {
      return res.status(401)
          .json({status: 'failed', message: 'Another account using this email was found'});
    }

    new_user.password = bcrypt.hashSync(new_user.password, null, null);
    await usersModel.insert(new_user);
    return res.render('pages/signupSuccess', {title: 'Sign Up Successful'});
  } catch(err){
    console.error(err);
    return res.status(500)
        .json({err, data: 'Unable to signup user, internal server error'});  }
});

module.exports = router;
