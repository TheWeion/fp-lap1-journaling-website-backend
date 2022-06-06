//const allData = require('../json/data.json')
const fs = require('fs');


class Post {
    constructor(post, gif) {
        this.post = post;
        this.gif = gif;

    }
    static getAll() {
        fs.readFile('./json/data.json', 'utf8', (err, jsonString) => {
            if(err) {
                console.log('File read failed:', err);
                return;
            } 
            try {
                const comment = JSON.parse(jsonString);
                console.log("All comments are here:", comment);
        
            } catch (err) {
                console.log("Error parsing JSON string:", err);
            }
        });
    }


}

Post.getAll();
module.exports = Post;
