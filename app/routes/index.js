const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt-nodejs");
const axios = require('axios');

const usersModel = require('../database/models/usersModel');

/* GET home page. */
router.get('/', async function(req, res, next) {

  const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=pasta&maxFat=25&number=8&apiKey=${process.env.SPOON_API}`);
  const initial_recipes = response.data.results;
  const ids = [];
  initial_recipes.map(async (recipe) => {
    ids.push(recipe.id);
  });
  const bulkResponse = await axios.get(`https://api.spoonacular.com/recipes/informationBulk?ids=${ids.join(',')}&apiKey=${process.env.SPOON_API}`);

  const topRecipes = bulkResponse.data;
  res.render('index', { title: 'Hot-Dawg', topRecipes });
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
        .json({err, data: 'Unable to signup user, internal server error'});  }
});

module.exports = router;
