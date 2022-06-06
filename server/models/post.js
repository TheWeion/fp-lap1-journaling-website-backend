const fs = require('fs');

class Post {

    constructor(data){
        this.id = data.id;
        this.post = data.post;
        this.gif = data.gif;
    }

    static get all() {
        //read from the json
        fs.readFile('./server/json/data.json', 'utf8', (err, jsonString) => {
            if(err) {
                console.log('File read failed:', err);
                return err;
            } 
            try {
                const comment = JSON.parse(jsonString);
                console.log("All comments are here:", comment);
                return comment;
        
            } catch (err) {
                console.log("Error parsing JSON string:", err);
                return err;
            }
        });
    }
    static get allPosts(){
        // Read a string from another file synchronously
        let content;
        try {
            content = fs.readFileSync('./server/json/data.json', { encoding: 'utf8' });
            const posts = JSON.parse(content);
            console.log("All posts are here:", posts);
            return posts;
        } catch(err) {
        // An error occurred
        console.error(err);
        }
    }
    static addPost(data){
        //write post details to json
        const allPosts = this.allPosts; //Get posts from json
        const newPostID = allPosts.length +1; // make new add for post

        const newPost = { id: newPostID, ...data }; //add new add to post
        allPosts.push(newPost); //add new post to all posts

        //writing the posts with the new posts to json
        const post = JSON.stringify(allPosts, null, 2);

        fs.writeFile('./server/json/data.json', post, (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });
    }
}

module.exports = Post;