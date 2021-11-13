# Decision to use Spoonacular API
* Status: accepted

## Context and Problem Statement
We needed to decide what part of the recipe we can use the Spoonacular API. Since Spoonacular does not support all CRUD actions, we need to make it compatible with our web app.

## Considered Options
* Use Spoonacular API at all time.
* Use Sppoonacular API to only access the recipes platform provides.
* Make some random recipes insdead of Sppoonacular API.

## Decision Outcome
We decided to use Spoonacular API to access the recipes because the API offers access to more than 365,000 recipes and nutritional information. 

With Spoonacular's food search engine, we could soon find everything from the server, hence Spoonacular API can easily satisfies the basic recipe searching function.

There will also be another API assists with Spoonacular to do a better job on add and delete new recipe based on users' operations. 

Two more advantages of using Spoonacular:

1. By simply applies Spoonacular API's functions including getSimilar and getRandom, We can shape our landing Page with pecipe of the day.

2. Spoonacular API provides nutrition facts on individual recipe. The meal planner/ food tracker counts your calories, protein, fat, carbs, sugar, and other nutrients for you.
