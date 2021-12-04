const express = require('express');
const router = express.Router();
const axios = require('axios');

const recipesModel = require('../database/models/recipesModel');
const savedRecipesModel = require('../database/models/savedRecipesModel');

router.get('/', async function(req, res, next){
   try {
       const uid = req.user.id;
       const recipes = await recipesModel.getByUid(uid);
       const spoonacular_recipes = await recipesModel.getByNullRidAndUid(uid);
       const ids = [];
       spoonacular_recipes.map(async (recipe) => {
           ids.push(recipe.sid);
       });
       const bulkResponse = await axios.get(`https://api.spoonacular.com/recipes/informationBulk?ids=${ids.join(',')}&apiKey=${process.env.SPOON_API}`);
       recipes.push(...bulkResponse.data);
       return res.render('pages/mycookbook', {title: 'My Cook Book', recipes});
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
            .json({err, data: 'Unable to add recipe, internal server error'});  }
});

router.post('/saved_recipe', async function(req, res, next){
   try{
       const {rid, is_database} = req.body;
       const uid = req.user.id;
       const payload = {
         uid, rid: is_database === 'true'?rid: null, sid: is_database === 'false' ?rid: null, is_creator: false,
       };
       await savedRecipesModel.insert(payload);
       return res.send('success');
   } catch(err){
       console.error(err);
       return res.status(500)
           .json({err, data: 'Internal server error, unable to save recipe'});
   }
});

module.exports = router;
