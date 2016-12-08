# Steam Team

## Setup

#### Install Node.js
1. Install [HomeBrew](http://brew.sh/)
2. Install `nvm` via `brew install nvm` and follow the prompts
3. Install `node` via `nvm install v6.8.1`

#### Setting up the Project
4. Install `gulp` via `npm install -g gulp`
5. Install all dev dependencies via `npm install` in root of the project directory
6. Run `gulp build` to build all of the assets while in the root of the project directory

#### Running the Project
7. Start the MySQL service with `mysqld`
8. After the frontend web section is built, run `npm start` in the root of the project to start the webserver at [http://localhost:3000/](http://localhost:3000/)

## Development
1. Open a Terminal session and run `gulp start` this will start `nodemon` and a local `express` server to rebuild backend files.
2. Open another Terminal session and run `gulp watch` this will start the watch task to rebuild frontend files.

#### Deviations from Progress Report
We ended up not going with the input game name user flow, the steam API doesn't allow for resolving game info via just game name. So it was a technical constraint of the third-party API we were using.

If you drop the .zip file for this project into any directory on a Linux/OS X machine owned by the user you're logged in as you should be good to do the Installation/Setting up project.

#### Frontend Code Questions
**1. User should be able to create new objects in the database. (7 Points)**
- When a user puts their or others Steam profile URLs into the box on the website, their User model, all of their Games, and individual Games are created in the database.

**2. User should be able to delete data from database. (7 Points)**
- A user can delete from the database by inputting the profile URLs they want to delete

**3. User should be able to read data from database. (7 Points)**

- A user can use the results table to see past queries through the app, and if they press "Submit" instead of "Update", they can use the database as a local cache for the queries. (The database starts empty, and wipes itself everytime the app is run. This means you have to start by adding many steam profile URLs and then selecting Update to populate the DB.)


**4. User should be able to update data in the database. (7 Points)**
- If a user adds steam profiles to the input, and presses "Update" new data is taken from the Steam Web API, and then saved in the database.

**5. Completeness of operations provided to the user. ( 4 Points)**
- They all work to the best of our knowledge to be honest.

**7. Error handling system (testing of argument checking, user input, SQL error catch/try mechanism (4 points)**
- Kinda dropped the ball on this one, because that wasnt our focus. There are some automated unit tests that can be run with `npm test` in the project root, after all the dependencies are installed, (step #5 in setup).

**8. BONUS POINTS: additional front end functionality such as website from a 2 person group ( 1- 5 points), 1 person group (1-10 points)**
- A website exists, so like if you run this app it opens a webapp.

**9. BONUS POINTS: overly complicated translations from user operations to database operations (1-5 points)**
- Algorithms developed for transforming the data from the Steam Web API, and then to find the most popular game by playtime all written via code, _could_ be translated to SQL, but it made more sense to transform it via code, and then write the algorithm in code.

### Test Steam Profiles
Literally you can copy and paste this in and populate your database

```
http://steamcommunity.com/id/AtlasTehLeet/
http://steamcommunity.com/profiles/76561197972297924
http://steamcommunity.com/id/k0nspiracy
http://steamcommunity.com/id/dysxqer
http://steamcommunity.com/profiles/76561198075021841
http://steamcommunity.com/profiles/76561197972297924
http://steamcommunity.com/profiles/76561198121425666
http://steamcommunity.com/profiles/76561197989294241
http://steamcommunity.com/id/DonPatchie
http://steamcommunity.com/id/Darthrob1016
```
