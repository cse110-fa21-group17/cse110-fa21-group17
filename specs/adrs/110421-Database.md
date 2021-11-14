# Decision to use Database
* Status: accepted

## Context and Problem Statement
We needed to decide how we would allow users to add/delete recipes. Since we also wanted to have a login system, we also needed to decide how we wanted to store users' login credentials. 

## Considered Options
* MySQL Database
* Local Storage
* Add recipes to Spoonacular's database
* Don't allow users to add or delete recipes

## Decision Outcome
We decided to use a MySQL database because we thought it would provide a better user experience than using local storage. If we were to use local storage, the user's recipes would only be stored on their local machine, so they won't persist if they switch to a different device.  

We would also have to come up with a different way to store user credentials if we were to use local storage. With the MySQL database, we could have a table that stores user credentials.  

From a development standpoint, we thought that the testing process might be easier if we all worked with the same data on a single database rather than if we had individual data on each of our local machines. 

We found out that we can't add recipes to Spoonacular's database of recipes so we decided that this option wasn't viable. 

Not allowing users to add or delete recipes was the simplest solution, but we would've had to think of a different way to implement CRUD features, which would've taken more time. 