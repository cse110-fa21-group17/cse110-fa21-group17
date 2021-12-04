require('dotenv').config();

const express = require('express');
const router = express.Router();

const recipesModel = require('../database/models/recipesModel');
const savedRecipesModel = require('../database/models/savedRecipesModel');

const isOwnerOfRecipe = require('../middlewares/validators/isOwnerOfRecipe');

router.get('/', async function(req, res, next){
   try {
       const uid = req.user.id;
       const recipes = await recipesModel.getByUid(uid);
       // TODO: add search for spoonacular recipes
       return res.render('pages/mycookbook', {title: 'My Cook Book', recipes});
   } catch (err){
       console.error(err);
       return res.status(500)
           .json({err, data: 'Unable to add recipe, internal server error'});
   }
});

router.get('/calorie_track', async function(req, res, next){
    try {
        const uid = req.user.id;
        const recipes = await recipesModel.getByUid(uid);
        // TODO: add search for spoonacular recipes
        return res.render('pages/calorie_tracking', {title: 'Calorie Tracker', recipes});
    } catch (err){
        console.error(err);
        return res.status(500)
            .json({err, data: 'Unable to add recipe, internal server error'});
    }
});

router.get('/new_recipe', async function(req, res, next){
    res.render('pages/newrecipe', {title: 'Create Recipe'});
});

router.post('/new_recipe', async function(req, res, next){
    try {
        const new_rec = req.body;
        const uid = req.user.id;
        await recipesModel.insertAsCreator(new_rec, uid);
        return res.redirect('/dashboard');
    } catch(err){
        console.error(err);
        return res.status(500)
            .json({err, data: 'Unable to add recipe, internal server error'});
    }
});

router.get('/delete_recipe/:id', isOwnerOfRecipe, async function(req, res, next){
    try {
        const uid = req.user.id;
        const rid = req.params.id;
        await savedRecipesModel.removeByUidAndRid(uid, rid);
        return res.redirect('/dashboard');
    } catch(err){
        console.error(err);
        return res.status(500)
            .json({err, data: 'Unable to add recipe, internal server error'});
    }
});

router.get('/modify_recipe/:id', isOwnerOfRecipe, async function(req, res, next){
    try {
        const rid = req.params.id;
        const rows = await recipesModel.getById(rid);
        const recipe = rows[0];
        return res.render('pages/modifyRecipe', {title: 'modify', recipe});
    } catch(err){
        console.error(err);
        return res.status(500)
            .json({err, data: 'Unable to add recipe, internal server error'});
    }
});

router.post('/modify_recipe', async function(req, res, next){
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
    } catch(err){
        console.error(err);
        return res.status(500)
            .json({err, data: 'Unable to add recipe, internal server error'});
    }
});

module.exports = router;
