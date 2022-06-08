# Lap 1 - Project : Journaling Website | Back-End

> This community driven website allows coffee lovers across London to post and comment about the best beverage in a coders arsenal - Java.

**This Repo houses all the server files that will interact with the frontend when it reaches a prod environment.**

## Installation & Usage

### Installation

* Clone or download the repo.
* Then navigate to the `server` folder.
* Run `npm install` to install dependencies.

### Usage

* Run `npm start` to start server.
* Run `npm test` to run test suite.

## Changelog
*  In the ./models/post 
     * Create class Post with constructor
     * Add allPosts() function to the Post to read all data in json file 
     * Add addPost() to write new posts to the JSON file
     * Add addComment() to add new comments to the post as an array
     * Add postById() to return post by Id
     * Add addReactions() to read and write ractions to the posts
    
 * In the controllers/router
    * Add two post functions: for post and comments
        
* Testing:
    * Install jest - run `npm install --save-dev jest`
    * Install nodemon - run  `npm install -D nodemon`
    * Install supertest - run `npm install supertest --save-dev`
    * Add coverage to the scripts to make sure over 60% of code is tested - "coverage": "jest --coverage --silent"
    * To check the coverage - run `npm run coverage`

## Bugs
* No bugs discovered at the time of deployment 

## Wins & Challenges

### Wins

### Challenges

----
## Credits

>Brewed with ❤️ by Abigail, Hanibal, Terry, and Vlada
