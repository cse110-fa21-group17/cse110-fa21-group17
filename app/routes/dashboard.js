require('dotenv').config();

const express = require('express');
const router = express.Router();
const axios = require('axios');

const recipesModel = require('../database/models/recipesModel');
const savedRecipesModel = require('../database/models/savedRecipesModel');

const isOwnerOfRecipe = require('../middlewares/validators/isOwnerOfRecipe');

router.get('/', async function(req, res, next) {
    try {
        const uid = req.user.id;
        const recipes = await recipesModel.getByUid(uid);
        const spoonacular_recipes = await recipesModel.getByNullRidAndUid(uid);
        const ids = [];
        spoonacular_recipes.map(async (recipe) => {
            ids.push(recipe.sid);
        });
        if (ids.length > 0) {
            const bulkResponse = await axios.get(`https://api.spoonacular.com/recipes/informationBulk?ids=${ids.join(',')}&apiKey=${process.env.SPOON_API}`);
            recipes.push(...bulkResponse.data);
        }
        return res.render('pages/mycookbook', {title: 'My Cook Book', recipes, uid});
    } catch (err) {
        console.error(err);
        return res.status(500)
            .json({err, data: 'Unable to add recipe, internal server error'});
    }
});

router.get('/calorie_track', async function(req, res, next) {
    try {
        const uid = req.user.id;
        const recipes = await recipesModel.getByUid(uid);
        // TODO: add search for spoonacular recipes
        const spoonacular_recipes = await recipesModel.getByNullRidAndUid(uid);
        const ids = [];
        spoonacular_recipes.map(async (recipe) => {
            ids.push(recipe.sid);
        });
        if (ids.length > 0) {
            const bulkResponse = await axios.get(`https://api.spoonacular.com/recipes/informationBulk?ids=${ids.join(',')}&includeNutrition=true&apiKey=${process.env.SPOON_API}`);
            const spoon_recipes = bulkResponse.data;
            spoon_recipes.map((recipe) => {
                recipe.fat = Math.floor(recipe.nutrition.weightPerServing.amount * recipe.nutrition.caloricBreakdown.percentFat);
                recipe.carbs = Math.floor(recipe.nutrition.weightPerServing.amount * recipe.nutrition.caloricBreakdown.percentCarbs);
                recipe.protein = Math.floor(recipe.nutrition.weightPerServing.amount * recipe.nutrition.caloricBreakdown.percentProtein);
            });
            recipes.push(...bulkResponse.data);
        }
        return res.render('pages/calorie_tracking', {title: 'Calorie Tracker', recipes, uid});
    } catch (err) {
        console.error(err);
        return res.status(500)
            .json({err, data: 'Unable to add recipe, internal server error'});
    }
});

router.get('/new_recipe', async function(req, res, next) {
    res.render('pages/newrecipe', {title: 'Create Recipe'});
});

router.post('/new_recipe', async function(req, res, next) {
    try {
        const new_rec = req.body;
        const uid = req.user.id;
        await recipesModel.insertAsCreator(new_rec, uid);
        return res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        return res.status(500)
            .json({err, data: 'Unable to add recipe, internal server error'});
    }
});

router.get('/delete_recipe/:id', async function(req, res, next) {
    try {
        const uid = req.user.id;
        const rid = req.params.id;
        await savedRecipesModel.removeByUidAndRid(uid, rid);
        return res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        return res.status(500)
            .json({err, data: 'Unable to add recipe, internal server error'});
    }
});

router.get('/delete_spoon_recipe/:id', async function(req, res, next) {
    try {
        const uid = req.user.id;
        const rid = req.params.id;
        await savedRecipesModel.removeByUidAndSid(uid, rid);
        return res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        return res.status(500)
            .json({err, data: 'Unable to add recipe, internal server error'});
    }
});

router.get('/modify_recipe/:id', isOwnerOfRecipe, async function(req, res, next) {
    try {
        const uid = req.user.id;
        const rid = req.params.id;
        const rows = await recipesModel.getById(rid);
        const recipe = rows[0];
        return res.render('pages/modifyRecipe', {title: 'modify', recipe, uid});
    } catch (err) {
        console.error(err);
        return res.status(500)
            .json({err, data: 'Unable to add recipe, internal server error'});
    }
});

router.post('/modify_recipe', async function(req, res, next) {
    try {
        const recipe_content = req.body;
        const uid = req.user.id;
        const ownership = await savedRecipesModel.getByUidAndRid(uid, recipe_content.id);
        if (!(ownership.length > 0 && ownership[0].is_creator)) {
            return res.status(401)
                .json({status: 'forbidden', message: 'Your are not the owner of this recipe!'});
        }
        await recipesModel.updateById(recipe_content.id, recipe_content);
        return res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        return res.status(500)
            .json({err, data: 'Unable to add recipe, internal server error'});
    }
});

router.post('/saved_recipe', async function(req, res, next) {
    try {
        const {rid, is_database} = req.body;
        const uid = req.user.id;
        let saved_spoon = []; let saved_database = [];
        if (is_database) {
            saved_database = await savedRecipesModel.getByUidAndRid(uid, rid);
        } else {
            saved_spoon = await savedRecipesModel.getByUidAndSid(uid, rid);
        }

        if (saved_database.length !== 0 || saved_spoon.length !== 0) {
            return res.status(400).json({message: 'forbidden, already saved recipe'});
        }
        const payload = {
            uid, rid: is_database === 'true'?rid: null, sid: is_database === 'false' ?rid: null, is_creator: false,
        };
        await savedRecipesModel.insert(payload);
        return res.send('success');
    } catch (err) {
        console.error(err);
        return res.status(500)
            .json({err, data: 'Internal server error, unable to save recipe, try again later'});
    }
});

module.exports = router;
