# Onboarding Guide
Hello, we're Team 17 and we would like to talk about how you can pick up this project after us.

## Team introduction
Our [GitHub page](/README.md)

You can find detailed informations of our team members [here](/admin/team.md).

## How to begin
To begin, we suggest breaking your team up into frontend and backend teams. The frontend team can work on styling each page of our app to make sure that they follow a consistent format. The backend team can work on managing the database and the overall functionality of the project. 

## Create your .env file
The first thing that each member of your team should do is create a .env file inside their root directory. This file should contain keys for the MySQL database that we're using. It also contains a Spoonacular API key, which is the database we're using to fetch recipes. If your team doesn't already have a Spoonacular key, make sure to set one up. 

### Example:
```
        HOST=" "  
        DATAPORT=" "  
        DATAUSER=" "  
        PASSWORD=" "  
        DATABASE=" "  
        SECRETKEY=" "  
        SPOON_API=" "  
```        
You can find a sample [here](/app/.env_sample).

## Run the code on your local machine
You'll first want to ```cd``` into the app directory of the project by running ```cd app```. Once you're inside the app directory, you should run ```npm install```. After that, you'll be able to run ```nodemon``` inside the app directory. The command ```nodemon``` is used to monitor any changes and restart the live server with updated code. Finally, you can visit the built project at [http://localhost:3000/](http://localhost:3000/). 



## How to run tests on our project
You'll want to make sure that you're in the app directory of the project again. If you haven't run ```npm install``` before, make sure that you run it before doing any testing. Now you can run the tests that we've written by running ```npm test```. You can find the tests that we have written inside [`app/tests/backend`](/app/tests/backend).

## Where the code is located
You can find all the HTML code for our pages under the views folder in the app directory. The CSS and JavaScript code are located inside the public folder in the app directory. 