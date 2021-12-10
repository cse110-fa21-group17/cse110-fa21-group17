require('dotenv').config();

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const axios = require('axios');

const usersModel = require('../database/models/usersModel');
const recipesModel = require('../database/models/recipesModel');
const savedRecipesModel = require('../database/models/savedRecipesModel');

const token = require('../auth/token');

/* GET home page. */
router.get('/', async function(req, res, next) {
    try {
        const uid = req.user?req.user.id:null;
        const response = await axios.get(`https://api.spoonacular.com/recipes/random?number=8&apiKey=${process.env.SPOON_API}`);
        const initial_recipes = response.data.recipes;
        const spoonacular_recipes = await recipesModel.getByNullRidAndUid(uid);
        const saved_ids = await Promise.all(spoonacular_recipes.map((recipe) => recipe.sid));
        const ids = [];
        initial_recipes.map(async (recipe) => {
            ids.push(recipe.id);
        });
        const bulkResponse = await axios.get(`https://api.spoonacular.com/recipes/informationBulk?ids=${ids.join(',')}&apiKey=${process.env.SPOON_API}`);

        const topRecipes = bulkResponse.data;
        topRecipes.map((recipe) => {
            recipe.is_saved = saved_ids.includes(recipe.id);
        });
        return res.render('index', {title: 'Hot-Dawg', topRecipes, uid});
    } catch (err) {
        console.error(err);
        return res.status(500).json({status: 'internal server error'});
    }
});

router.get('/filter/:type', async function(req, res, next) {
    try {
        const uid = req.user?req.user.id:null;
        const type = req.params.type;
        const response = await axios.get(`https://api.spoonacular.com/recipes/random?number=8&type=${type}&apiKey=${process.env.SPOON_API}`);
        const initial_recipes = response.data.recipes;
        const spoonacular_recipes = await recipesModel.getByNullRidAndUid(uid);
        const saved_ids = await Promise.all(spoonacular_recipes.map((recipe) => recipe.sid));
        const ids = [];
        initial_recipes.map(async (recipe) => {
            ids.push(recipe.id);
        });
        const bulkResponse = await axios.get(`https://api.spoonacular.com/recipes/informationBulk?ids=${ids.join(',')}&apiKey=${process.env.SPOON_API}`);

        const topRecipes = bulkResponse.data;
        topRecipes.map((recipe) => {
            recipe.is_saved = saved_ids.includes(recipe.id);
        });
        return res.render('index', {title: 'Hot-Dawg', topRecipes, uid});
    } catch (err) {
        console.error(err);
        return res.status(500).json({status: 'internal server error'});
    }
});

router.get('/calorie_calculator', async function(req, res, next) {
    try {
        const uid = req.user?req.user.id:null;
        return res.render('pages/calorie_calculator', {title: 'Calorie Calculator', uid});
    } catch (err) {
        console.error(err);
        return res.status(500).json({status: 'internal server error'});
    }
});

router.get('/search/:val', async function(req, res, next) {
    try {
        const uid = req.user?req.user.id:null;
        const val = req.params.val;
        const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${val}&apiKey=${process.env.SPOON_API}`);
        const initial_recipes = response.data.results;
        const spoonacular_recipes = await recipesModel.getByNullRidAndUid(uid);
        const saved_ids = await Promise.all(spoonacular_recipes.map((recipe) => recipe.sid));
        const ids = [];
        initial_recipes.map(async (recipe) => {
            ids.push(recipe.id);
        });
        const bulkResponse = await axios.get(`https://api.spoonacular.com/recipes/informationBulk?ids=${ids.join(',')}&apiKey=${process.env.SPOON_API}`);

        const topRecipes = bulkResponse.data;
        topRecipes.map((recipe) => {
            recipe.is_saved = saved_ids.includes(recipe.id);
        });
        return res.send(topRecipes);
    } catch (err) {
        console.error(err);
        return res.send('failed');
    }
});

router.get('/login', async function(req, res, next) {
    const uid = req.user?req.user.id:null;
    res.render('pages/login', {title: 'Log In', uid});
});

router.post('/login', async function(req, res, next) {
    try {
        const user = req.body;
        const user_in_db = await usersModel.getByEmail(user.email);

        if (user_in_db.length === 0) {
            // eventually need to make a better page and redirect them to signup.
            return res.status(401)
                .json({status: 'failed', message: 'Email not found, user does not exist in database'});
        }

        // add password comparison bcrypt.compareSync(user.password, user_in_db[0].password) returns boolean
        if (!bcrypt.compareSync(user.password, user_in_db[0].password)) {
            return res.status(401)
                .json({status: 'forbidden', message: 'password not correct'});
        }
        // include the auth/token.js file, call the generate token use await and store it in a token variable
        const user_token = await token.generateToken(user_in_db[0]);

        // add it in cookie, but first clear cookie, then add it under the key userInfo
        res.clearCookie('token');
        res.cookie('token', user_token);

        res.redirect('/');
    } catch (err) {
        console.error(err);
        return res.status(500)
            .json({err, data: 'Unable to signup user, internal server error'});
    }
});

router.get('/signup', async function(req, res, next) {
    const uid = req.user?req.user.id:null;
    res.render('pages/signup', {title: 'Sign Up', uid});
});

router.post('/signup', async function(req, res, next) {
    try {
    // get user from frontend
        const uid = req.user?req.user.id:null;

        const new_user = req.body;
        const users = await usersModel.getByEmail(new_user.email);

        // check if user with the same email exists
        if (users.length!==0) {
            return res.status(401)
                .json({status: 'failed', message: 'Another account using this email was found'});
        }

        // encrypt password
        new_user.password = bcrypt.hashSync(new_user.password, null, null);

        // insert user
        await usersModel.insert(new_user);
        return res.render('pages/signupSuccess', {title: 'Sign Up Successful', uid});
    } catch (err) {
        console.error(err);
        return res.status(500)
            .json({err, data: 'Unable to signup user, internal server error'});
    }
});

router.get('/recipe_page/:id/:is_database', async function(req, res, next) {
    const uid = req.user?req.user.id:null;

    const id = req.params.id;
    const is_database = req.params.is_database;
    let recipe = {};
    if (is_database==='true') {
        const rows = await recipesModel.getById(id);
        if (rows.length === 0) {
            return res.status(404)
                .json({message: 'recipe not found'});
        }
        recipe = rows[0];
    } else {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${process.env.SPOON_API}`);
        recipe = response.data;
        recipe.ingredients = '';
        recipe.instruction = '';
        recipe.extendedIngredients.map((ingredient) =>{
            if (ingredient.original!==undefined) {
                recipe.ingredients += '\t'+ingredient.original+'\n';
            }
        });
        const instruction_response = await axios.get(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${process.env.SPOON_API}`);
        const instructions = instruction_response.data.length !== 0?instruction_response.data[0].steps:[{number: '1', step: 'No instruction available'}];

        instructions.map((instruction) => {
            recipe.instruction += '\t'+instruction.number+'. '+instruction.step+'\n';
        });
        const nutrition = await axios.get(`https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${process.env.SPOON_API}`);
        recipe.fat = nutrition.data.fat;
        recipe.carbs = nutrition.data.carbs;
        recipe.protein = nutrition.data.protein;
        recipe.ready_in_minutes = recipe.readyInMinutes;
    }
    res.render('pages/recipe_page', {title: 'recipe page', recipe, uid});
});

router.get('/healthcheck', async function(req, res, next) {
    return res.status(200).json({status: 'success'});
});

router.get('/logout', async function(req, res, next) {
    try {
        res.clearCookie('token');
        return res.redirect('/');
    } catch (err) {
        console.error(err);
        return res.status(500).json({status: 'Internal server error'});
    }
});

module.exports = router;
