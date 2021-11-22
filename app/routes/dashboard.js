const express = require('express');
const router = express.Router();

const recipesModel = require('../database/models/recipesModel');
const savedRecipesModel = require('../database/models/savedRecipesModel');

router.get('/', async function(req, res, next){
   try {
       const uid = req.user.id;
       const savedSpoonRecipes = await savedRecipesModel.getByUidAndNullRid(uid);
       const recipes = await recipesModel.getByUid(uid);
       const ids = await Promise.all(savedSpoonRecipes.map(recipe => {
           return recipe.sid;
       }));
       if(ids.length !== 0){
           const bulkResponse = await axios.get(`https://api.spoonacular.com/recipes/informationBulk?ids=${ids.join(',')}&apiKey=${process.env.SPOON_API}`);
           const spoonRecipes = bulkResponse.data;
           recipes.concat(spoonRecipes);
       }
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
        return res.render('pages/AddRecipeSuccess', {title: 'Add Recipe Successful'});
    } catch(err){
        console.error(err);
        return res.status(500)
            .json({err, data: 'Unable to add recipe, internal server error'});  }
});

module.exports = router;
