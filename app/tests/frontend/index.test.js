describe('Basic user flow for Hot Dawg', () => {
    // First, visit our app

    jest.setTimeout(50000);
    beforeAll(async () => {
      await page.goto('http://localhost:3000/');
      //await page.goto('http://hotstage-env.eba-impqun6r.us-west-1.elasticbeanstalk.com/');
    });
  
    // Next, check to make sure that all 8 recipe cards have loaded
    it('Initial landing Page - Check for 8 recipes', async () => {
      console.log('Checking for recipes on landing page...');
      // Query select all of the <div.recipeCard> elements and return the length of that array
      const numRecipes = await page.$$eval('div.recipeCard', (recipeList) => {
        return recipeList.length;
      });
      // Expect there that array from earlier to be of length 8, meaning 8 <div.recipeCard> elements where found
      expect(numRecipes).toBe(8);
    });
  
    // Check to make sure that all 8 recipe cards have danta in them
    it('Make sure recipe cards are populated', async () => {
      console.log('Checking to make sure recipe cards are populated...');
      // Start as true, if any don't have data, swap to false
      let allArePopulated = true;
      let data, plainValue;
      // Query select all of the recipe cards
      const recipeList = await page.$$('div.recipeCard');
      
      for (let i = 0; i < recipeList.length; i++) {
        console.log(`Checking recipe ` + (i + 1) + `/${recipeList.length}`);

        
        var title = await recipeList[i].$('cardText');
        // Make sure we have the text and image
        //if (title) { allArePopulated = false; }
        //if (recipeList[i].cardText > p.recipeTitle) { allArePopulated = false; }
        if (recipeList[i].cardText.card-tags) { allArePopulated = false; }
        if (recipeList[i].cardText.card-details) { allArePopulated = false; }
        if (recipeList[i].cardImage.src) { allArePopulated = false; }
        
        // Expect allArePopulated to still be true
        expect(allArePopulated).toBe(true);
      }
  
    }, 10000);

    //Test View By Types button and make sure the new cards are different

    //test searchbar 

    //test login

    //test bookmark/my cookbook

    //test calorie tracking (aftter logged in)

    //test add custom recipe

    //test body calculator btn

    //test signout btn
});