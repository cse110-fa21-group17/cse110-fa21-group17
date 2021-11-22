const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt-nodejs");
const axios = require('axios');

const usersModel = require('../database/models/usersModel');
const recipesModel = require('../database/models/recipesModel');

const token = require('../auth/token');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const topRecipes = [
    {"vegetarian":false,"vegan":false,"glutenFree":false,"dairyFree":false,"veryHealthy":true,"cheap":false,"veryPopular":false,"sustainable":false,"weightWatcherSmartPoints":11,"gaps":"no","lowFodmap":false,"aggregateLikes":2,"spoonacularScore":92.0,"healthScore":90.0,"creditsText":"Foodista.com – The Cooking Encyclopedia Everyone Can Edit","license":"CC BY 3.0","sourceName":"Foodista","pricePerServing":168.12,"extendedIngredients":[{"id":20081,"aisle":"Baking","image":"flour.png","consistency":"solid","name":"flour","nameClean":"wheat flour","original":"2 tablespoons Flour","originalString":"2 tablespoons Flour","originalName":"Flour","amount":2.0,"unit":"tablespoons","meta":[],"metaInformation":[],"measures":{"us":{"amount":2.0,"unitShort":"Tbsps","unitLong":"Tbsps"},"metric":{"amount":2.0,"unitShort":"Tbsps","unitLong":"Tbsps"}}},{"id":11291,"aisle":"Produce","image":"spring-onions.jpg","consistency":"solid","name":"green onions","nameClean":"spring onions","original":"cup Green Onions, chopped","originalString":"cup Green Onions, chopped","originalName":"Green Onions, chopped","amount":1.0,"unit":"cup","meta":["chopped"],"metaInformation":["chopped"],"measures":{"us":{"amount":1.0,"unitShort":"cup","unitLong":"cup"},"metric":{"amount":236.588,"unitShort":"ml","unitLong":"milliliters"}}},{"id":1085,"aisle":"Milk, Eggs, Other Dairy","image":"milk.jpg","consistency":"liquid","name":"non-fat milk","nameClean":"fat free milk","original":"1 1/4 cups Non-Fat Milk","originalString":"1 1/4 cups Non-Fat Milk","originalName":"Non-Fat Milk","amount":1.25,"unit":"cups","meta":[],"metaInformation":[],"measures":{"us":{"amount":1.25,"unitShort":"cups","unitLong":"cups"},"metric":{"amount":295.735,"unitShort":"ml","unitLong":"milliliters"}}},{"id":4053,"aisle":"Oil, Vinegar, Salad Dressing","image":"olive-oil.jpg","consistency":"liquid","name":"olive oil","nameClean":"olive oil","original":"2 tablespoons Olive Oil","originalString":"2 tablespoons Olive Oil","originalName":"Olive Oil","amount":2.0,"unit":"tablespoons","meta":[],"metaInformation":[],"measures":{"us":{"amount":2.0,"unitShort":"Tbsps","unitLong":"Tbsps"},"metric":{"amount":2.0,"unitShort":"Tbsps","unitLong":"Tbsps"}}},{"id":11282,"aisle":"Produce","image":"brown-onion.png","consistency":"solid","name":"onion","nameClean":"onion","original":"2 tablespoons Onion, minced","originalString":"2 tablespoons Onion, minced","originalName":"Onion, minced","amount":2.0,"unit":"tablespoons","meta":["minced"],"metaInformation":["minced"],"measures":{"us":{"amount":2.0,"unitShort":"Tbsps","unitLong":"Tbsps"},"metric":{"amount":2.0,"unitShort":"Tbsps","unitLong":"Tbsps"}}},{"id":1033,"aisle":"Cheese","image":"parmesan.jpg","consistency":"solid","name":"parmesan cheese","nameClean":"parmesan","original":"1/4 cup Parmesan Cheese, grated","originalString":"1/4 cup Parmesan Cheese, grated","originalName":"Parmesan Cheese, grated","amount":0.25,"unit":"cup","meta":["grated"],"metaInformation":["grated"],"measures":{"us":{"amount":0.25,"unitShort":"cups","unitLong":"cups"},"metric":{"amount":59.147,"unitShort":"ml","unitLong":"milliliters"}}},{"id":11297,"aisle":"Produce;Spices and Seasonings","image":"parsley.jpg","consistency":"solid","name":"parsley","nameClean":"parsley","original":"cup Fresh Parsley or Basil, chopped","originalString":"cup Fresh Parsley or Basil, chopped","originalName":"Fresh Parsley or Basil, chopped","amount":1.0,"unit":"cup","meta":["fresh","chopped"],"metaInformation":["fresh","chopped"],"measures":{"us":{"amount":1.0,"unitShort":"cup","unitLong":"cup"},"metric":{"amount":236.588,"unitShort":"ml","unitLong":"milliliters"}}},{"id":20420,"aisle":"Pasta and Rice","image":"fusilli.jpg","consistency":"solid","name":"pasta","nameClean":"pasta","original":"8 ounces Tubular Pasta","originalString":"8 ounces Tubular Pasta","originalName":"Tubular Pasta","amount":8.0,"unit":"ounces","meta":[],"metaInformation":[],"measures":{"us":{"amount":8.0,"unitShort":"oz","unitLong":"ounces"},"metric":{"amount":226.796,"unitShort":"g","unitLong":"grams"}}},{"id":11304,"aisle":"Produce","image":"peas.jpg","consistency":"solid","name":"peas","nameClean":"petite peas","original":"1 cup Frozen Peas, thawed","originalString":"1 cup Frozen Peas, thawed","originalName":"Frozen Peas, thawed","amount":1.0,"unit":"cup","meta":["frozen","thawed"],"metaInformation":["frozen","thawed"],"measures":{"us":{"amount":1.0,"unitShort":"cup","unitLong":"cup"},"metric":{"amount":236.588,"unitShort":"ml","unitLong":"milliliters"}}},{"id":6168,"aisle":"Condiments","image":"hot-sauce-or-tabasco.png","consistency":"liquid","name":"pepper sauce","nameClean":"hot sauce","original":"1 dsh Hot Pepper Sauce","originalString":"1 dsh Hot Pepper Sauce","originalName":"dsh Hot Pepper Sauce","amount":1.0,"unit":"","meta":["hot"],"metaInformation":["hot"],"measures":{"us":{"amount":1.0,"unitShort":"","unitLong":""},"metric":{"amount":1.0,"unitShort":"","unitLong":""}}},{"id":15121,"aisle":"Canned and Jarred","image":"canned-tuna.png","consistency":"solid","name":"water-packed tuna","nameClean":"tuna packed in water","original":"6 1/2 ounces Can Water-Packed Tuna, drained","originalString":"6 1/2 ounces Can Water-Packed Tuna, drained","originalName":"Water-Packed Tuna, drained","amount":6.5,"unit":"ounces","meta":["drained"],"metaInformation":["drained"],"measures":{"us":{"amount":6.5,"unitShort":"oz","unitLong":"ounces"},"metric":{"amount":184.272,"unitShort":"g","unitLong":"grams"}}}],"id":654959,"title":"Pasta With Tuna","readyInMinutes":45,"servings":4,"sourceUrl":"http://www.foodista.com/recipe/K6QWSKQM/pasta-with-tuna","image":"https://spoonacular.com/recipeImages/654959-556x370.jpg","imageType":"jpg","summary":"Pasta With Tuna might be just the main course you are searching for. One serving contains <b>421 calories</b>, <b>24g of protein</b>, and <b>10g of fat</b>. For <b>$1.68 per serving</b>, this recipe <b>covers 28%</b> of your daily requirements of vitamins and minerals. 1 person were impressed by this recipe. Head to the store and pick up flour, onion, peas, and a few other things to make it today. It is a good option if you're following a <b>pescatarian</b> diet. All things considered, we decided this recipe <b>deserves a spoonacular score of 92%</b>. This score is excellent. Try <a href=\"https://spoonacular.com/recipes/pasta-and-tuna-salad-ensalada-de-pasta-y-atn-226303\">Pastan and Tuna Salad (Ensalada de Pasta y Atún)</a>, <a href=\"https://spoonacular.com/recipes/tuna-pasta-565100\">Tuna Pasta</a>, and <a href=\"https://spoonacular.com/recipes/tuna-pasta-89136\">Tuna Pasta</a> for similar recipes.","cuisines":[],"dishTypes":["lunch","main course","main dish","dinner"],"diets":["pescatarian"],"occasions":[],"winePairing":{"pairedWines":[],"pairingText":"No one wine will suit every pasta dish. Pasta in a tomato-based sauce will usually work well with a medium-bodied red, such as a montepulciano or chianti. Pasta with seafood or pesto will fare better with a light-bodied white, such as a pinot grigio. Cheese-heavy pasta can pair well with red or white - you might try a sangiovese wine for hard cheeses and a chardonnay for soft cheeses. We may be able to make a better recommendation if you ask again with a specific pasta dish.","productMatches":[]},"instructions":"<ol><li>Cook pasta in a large pot of boiling water until al dente. Drain and return to warm pot. Put olive oil in saucepan and add onion. Saute until transparent. Stir in flour and cook for a few seconds and then whisk in milk. Stir constantly until this thickens. Add peas, tuna (shredded into chunks,) parsley, green onions, cheese and hot pepper sauce. Pour over pasta and stir gently to mix. Serve at once.</li></ol>","analyzedInstructions":[{"name":"","steps":[{"number":1,"step":"Cook pasta in a large pot of boiling water until al dente.","ingredients":[{"id":20420,"name":"pasta","localizedName":"pasta","image":"fusilli.jpg"},{"id":14412,"name":"water","localizedName":"water","image":"water.png"}],"equipment":[{"id":404752,"name":"pot","localizedName":"pot","image":"stock-pot.jpg"}]},{"number":2,"step":"Drain and return to warm pot. Put olive oil in saucepan and add onion.","ingredients":[{"id":4053,"name":"olive oil","localizedName":"olive oil","image":"olive-oil.jpg"},{"id":11282,"name":"onion","localizedName":"onion","image":"brown-onion.png"}],"equipment":[{"id":404669,"name":"sauce pan","localizedName":"sauce pan","image":"sauce-pan.jpg"},{"id":404752,"name":"pot","localizedName":"pot","image":"stock-pot.jpg"}]},{"number":3,"step":"Saute until transparent. Stir in flour and cook for a few seconds and then whisk in milk. Stir constantly until this thickens.","ingredients":[{"id":20081,"name":"all purpose flour","localizedName":"all purpose flour","image":"flour.png"},{"id":1077,"name":"milk","localizedName":"milk","image":"milk.png"}],"equipment":[{"id":404661,"name":"whisk","localizedName":"whisk","image":"whisk.png"}]},{"number":4,"step":"Add peas, tuna (shredded into chunks,) parsley, green onions, cheese and hot pepper sauce.","ingredients":[{"id":6168,"name":"hot sauce","localizedName":"hot sauce","image":"hot-sauce-or-tabasco.png"},{"id":11291,"name":"green onions","localizedName":"green onions","image":"spring-onions.jpg"},{"id":11297,"name":"parsley","localizedName":"parsley","image":"parsley.jpg"},{"id":1041009,"name":"cheese","localizedName":"cheese","image":"cheddar-cheese.png"},{"id":11304,"name":"peas","localizedName":"peas","image":"peas.jpg"},{"id":10015121,"name":"tuna","localizedName":"tuna","image":"canned-tuna.png"}],"equipment":[]},{"number":5,"step":"Pour over pasta and stir gently to mix.","ingredients":[{"id":20420,"name":"pasta","localizedName":"pasta","image":"fusilli.jpg"}],"equipment":[]},{"number":6,"step":"Serve at once.","ingredients":[],"equipment":[]}]}],"originalId":null,"spoonacularSourceUrl":"https://spoonacular.com/pasta-with-tuna-654959"},
    {"vegetarian":false,"vegan":false,"glutenFree":false,"dairyFree":true,"veryHealthy":false,"cheap":false,"veryPopular":false,"sustainable":false,"weightWatcherSmartPoints":12,"gaps":"no","lowFodmap":false,"aggregateLikes":1,"spoonacularScore":69.0,"healthScore":28.0,"creditsText":"Foodista.com – The Cooking Encyclopedia Everyone Can Edit","license":"CC BY 3.0","sourceName":"Foodista","pricePerServing":616.45,"extendedIngredients":[{"id":10211821,"aisle":"Produce","image":"yellow-bell-pepper.jpg","consistency":"solid","name":"bell pepper","nameClean":"bell pepper","original":"Freshly-ground black pepper to taste","originalString":"Freshly-ground black pepper to taste","originalName":"Freshly-ground black pepper to taste","amount":2.0,"unit":"servings","meta":["black","freshly-ground","to taste"],"metaInformation":["black","freshly-ground","to taste"],"measures":{"us":{"amount":2.0,"unitShort":"servings","unitLong":"servings"},"metric":{"amount":2.0,"unitShort":"servings","unitLong":"servings"}}},{"id":11215,"aisle":"Produce","image":"garlic.png","consistency":"solid","name":"garlic clove","nameClean":"garlic","original":"1 Garlic clove","originalString":"1 Garlic clove","originalName":"Garlic clove","amount":1.0,"unit":"","meta":[],"metaInformation":[],"measures":{"us":{"amount":1.0,"unitShort":"","unitLong":""},"metric":{"amount":1.0,"unitShort":"","unitLong":""}}},{"id":11297,"aisle":"Produce;Spices and Seasonings","image":"parsley.jpg","consistency":"solid","name":"parsley","nameClean":"parsley","original":"1/4 cup Chopped fresh Italian parsley","originalString":"1/4 cup Chopped fresh Italian parsley","originalName":"Chopped fresh Italian parsley","amount":0.25,"unit":"cup","meta":["fresh","italian","chopped"],"metaInformation":["fresh","italian","chopped"],"measures":{"us":{"amount":0.25,"unitShort":"cups","unitLong":"cups"},"metric":{"amount":59.147,"unitShort":"ml","unitLong":"milliliters"}}},{"id":10411529,"aisle":"Produce","image":"plum-tomatoes.png","consistency":"solid","name":"plum tomatoes","nameClean":"plum tomato","original":"2 cups Canned plum tomatoes drained, and","originalString":"2 cups Canned plum tomatoes drained, and","originalName":"Canned plum tomatoes drained, and","amount":2.0,"unit":"cups","meta":["canned","drained"],"metaInformation":["canned","drained"],"measures":{"us":{"amount":2.0,"unitShort":"cups","unitLong":"cups"},"metric":{"amount":473.176,"unitShort":"ml","unitLong":"milliliters"}}},{"id":2047,"aisle":"Spices and Seasonings","image":"salt.jpg","consistency":"solid","name":"salt","nameClean":"salt","original":"1/2 tablespoon Salt","originalString":"1/2 tablespoon Salt","originalName":"Salt","amount":0.5,"unit":"tablespoon","meta":[],"metaInformation":[],"measures":{"us":{"amount":0.5,"unitShort":"Tbsps","unitLong":"Tbsps"},"metric":{"amount":0.5,"unitShort":"Tbsps","unitLong":"Tbsps"}}},{"id":15270,"aisle":"Seafood","image":"shrimp.png","consistency":"solid","name":"shrimp","nameClean":"shrimp","original":"1/2 pound Shrimp, shelled and deveined","originalString":"1/2 pound Shrimp, shelled and deveined","originalName":"Shrimp, shelled and deveined","amount":0.5,"unit":"pound","meta":["shelled","deveined"],"metaInformation":["shelled","deveined"],"measures":{"us":{"amount":0.5,"unitShort":"lb","unitLong":"pounds"},"metric":{"amount":226.796,"unitShort":"g","unitLong":"grams"}}},{"id":99074,"aisle":"Gourmet","image":"squid-ink-pasta.jpg","consistency":"solid","name":"squid ink pasta","nameClean":"squid ink pasta","original":"1/2 pound Dried squid ink linguine or 1/4 cup Extra-virgin olive oil","originalString":"1/2 pound Dried squid ink linguine or 1/4 cup Extra-virgin olive oil","originalName":"Dried squid ink linguine or 1/4 cup Extra-virgin olive oil","amount":0.5,"unit":"pound","meta":["dried","extra-virgin"],"metaInformation":["dried","extra-virgin"],"measures":{"us":{"amount":0.5,"unitShort":"lb","unitLong":"pounds"},"metric":{"amount":226.796,"unitShort":"g","unitLong":"grams"}}}],"id":654812,"title":"Pasta and Seafood","readyInMinutes":45,"servings":2,"sourceUrl":"http://www.foodista.com/recipe/8YWWDKPS/pasta-and-seafood","image":"https://spoonacular.com/recipeImages/654812-556x370.jpg","imageType":"jpg","summary":"Pastan and Seafood is a <b>dairy free and pescatarian</b> main course. One serving contains <b>521 calories</b>, <b>38g of protein</b>, and <b>4g of fat</b>. This recipe serves 2 and costs $5.79 per serving. From preparation to the plate, this recipe takes around <b>45 minutes</b>. This recipe from Foodista has 1 fans. If you have shrimp, squid ink linguine, parsley, and a few other ingredients on hand, you can make it. To use up the salt you could follow this main course with the <a href=\"https://spoonacular.com/recipes/apple-turnovers-recipe-48175\">Apple Turnovers Recipe</a> as a dessert. All things considered, we decided this recipe <b>deserves a spoonacular score of 57%</b>. This score is solid. Try <a href=\"https://spoonacular.com/recipes/seafood-pasta-373851\">Seafood Pasta</a>, <a href=\"https://spoonacular.com/recipes/seafood-pasta-246928\">Seafood Pasta</a>, and <a href=\"https://spoonacular.com/recipes/seafood-pasta-22624\">Seafood Pasta</a> for similar recipes.","cuisines":[],"dishTypes":["lunch","main course","main dish","dinner"],"diets":["dairy free","pescatarian"],"occasions":[],"winePairing":{"pairedWines":[],"pairingText":"No one wine will suit every pasta dish. Pasta in a tomato-based sauce will usually work well with a medium-bodied red, such as a montepulciano or chianti. Pasta with seafood or pesto will fare better with a light-bodied white, such as a pinot grigio. Cheese-heavy pasta can pair well with red or white - you might try a sangiovese wine for hard cheeses and a chardonnay for soft cheeses. We may be able to make a better recommendation if you ask again with a specific pasta dish.","productMatches":[]},"instructions":"<ol><li>Bring water to a boil for pasta. Cook for 10 minutes or until al dente. In one saucepan heat half of the olive oil. Add garlic and saute for a few seconds. Add tomatoes and cook for 5 minutes or until thickened; season with salt and pepper.</li><li>In another skillet cook the shrimp in half the remaining olive oil. Remove from heat and toss in the parsley; season with salt and pepper. Drain pasta and transfer to a serving bowl; add shrimp and tomato mixtures and toss; do not serve with cheese.</li><li>This recipe yields 2 servings.</li></ol>","analyzedInstructions":[{"name":"","steps":[{"number":1,"step":"Bring water to a boil for pasta. Cook for 10 minutes or until al dente. In one saucepan heat half of the olive oil.","ingredients":[{"id":4053,"name":"olive oil","localizedName":"olive oil","image":"olive-oil.jpg"},{"id":20420,"name":"pasta","localizedName":"pasta","image":"fusilli.jpg"},{"id":14412,"name":"water","localizedName":"water","image":"water.png"}],"equipment":[{"id":404669,"name":"sauce pan","localizedName":"sauce pan","image":"sauce-pan.jpg"}],"length":{"number":10,"unit":"minutes"}},{"number":2,"step":"Add garlic and saute for a few seconds.","ingredients":[{"id":11215,"name":"garlic","localizedName":"garlic","image":"garlic.png"}],"equipment":[]},{"number":3,"step":"Add tomatoes and cook for 5 minutes or until thickened; season with salt and pepper.In another skillet cook the shrimp in half the remaining olive oil.","ingredients":[{"id":1102047,"name":"salt and pepper","localizedName":"salt and pepper","image":"salt-and-pepper.jpg"},{"id":4053,"name":"olive oil","localizedName":"olive oil","image":"olive-oil.jpg"},{"id":11529,"name":"tomato","localizedName":"tomato","image":"tomato.png"},{"id":15270,"name":"shrimp","localizedName":"shrimp","image":"shrimp.png"}],"equipment":[{"id":404645,"name":"frying pan","localizedName":"frying pan","image":"pan.png"}],"length":{"number":5,"unit":"minutes"}},{"number":4,"step":"Remove from heat and toss in the parsley; season with salt and pepper.","ingredients":[{"id":1102047,"name":"salt and pepper","localizedName":"salt and pepper","image":"salt-and-pepper.jpg"},{"id":11297,"name":"parsley","localizedName":"parsley","image":"parsley.jpg"}],"equipment":[]},{"number":5,"step":"Drain pasta and transfer to a serving bowl; add shrimp and tomato mixtures and toss; do not serve with cheese.This recipe yields 2 servings.","ingredients":[{"id":1041009,"name":"cheese","localizedName":"cheese","image":"cheddar-cheese.png"},{"id":15270,"name":"shrimp","localizedName":"shrimp","image":"shrimp.png"},{"id":11529,"name":"tomato","localizedName":"tomato","image":"tomato.png"},{"id":20420,"name":"pasta","localizedName":"pasta","image":"fusilli.jpg"}],"equipment":[{"id":404783,"name":"bowl","localizedName":"bowl","image":"bowl.jpg"}]}]}],"originalId":null,"spoonacularSourceUrl":"https://spoonacular.com/pasta-and-seafood-654812"}
  ];

  const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=pasta&maxFat=25&number=8&apiKey=${process.env.SPOON_API}`);
  const initial_recipes = response.data.results;
  console.log(initial_recipes);
  res.render('index', { title: 'Hot-Dawg', topRecipes });
});

router.get('/login', async function(req, res, next){
  res.render('pages/login', {title: 'Log In'});
});

router.post('/login', async function(req, res, next){
  try {

    const user = req.body;
    const user_in_db = await usersModel.getByEmail(user.email);

    if (user_in_db.length === 0){
      // eventually need to make a better page and redirect them to signup.
      return res.status(401)
          .json({status: 'failed', message: 'Email not found, user does not exist in database'});
    }

    // add password comparison bcrypt.compareSync(user.password, user_in_db[0].password) returns boolean
    if(!bcrypt.compareSync(user.password, user_in_db[0].password)){
      return res.status(401)
          .json({status: 'forbidden', message: 'password not correct'});
    }
    // include the auth/token.js file, call the generate token use await and store it in a token variable
    const user_token = await token.generateToken(user_in_db[0]);

    // add it in cookie, but first clear cookie, then add it under the key userInfo
    res.clearCookie('token');
    res.cookie("token", user_token);

    res.end('sign in successfully');

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

router.get('/recipe_page/:id/:is_database', async function(req, res, next){
  const id = req.params.id;
  const is_database = req.params.is_database;
  let recipe = {};
  if(is_database==='true'){
    const rows = await recipesModel.getById(id);
    if(rows.length === 0){
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
      if(ingredient.original!==undefined)
        recipe.ingredients += '\t'+ingredient.original+'\n';
    });
    const instruction_response = await axios.get(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${process.env.SPOON_API}`);
    const instructions = instruction_response.data.length !== 0?instruction_response.data[0].steps:[{number: '1', step:'No instruction available'}];

    instructions.map((instruction) => {
      recipe.instruction += '\t'+instruction.number+'. '+instruction.step+'\n';
    });
    const nutrition = await axios.get(`https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${process.env.SPOON_API}`);
    recipe.fat = nutrition.data.fat;
    recipe.carbs = nutrition.data.carbs;
    recipe.protein = nutrition.data.protein;
  }
  res.render('pages/recipe_page', {title: 'recipe page', recipe});
});

module.exports = router;
