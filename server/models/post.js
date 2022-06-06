const fs = require('fs');


class Post {
    constructor(post, gif) {
        this.post = post;
        this.gif = gif;

    }
    static getAll() {
        try {
            const jsonString = fs.readFileSync('./json/data.json');
            const comments = JSON.parse(jsonString);
            console.log(comments);
            return comments;
         } catch (err) {
             console.log("Error parsing JSON string:", err);
                return;
            }
        }
    }


Post.getAll();
module.exports = Post;
