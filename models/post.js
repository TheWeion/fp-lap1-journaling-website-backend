const fs = require('fs');

class Post {

    constructor(data){
        this.id = data.id;
        this.post = data.post;
        this.gif = data.gif;
    }

    static get all() {
        //read from the json
    }
    static get allPosts(){
        // Read a string from another file synchronously
        let content;
        try {
            content = fs.readFileSync('./json/data.json', { encoding: 'utf8' });
            const posts = JSON.parse(content);
           // console.log("All posts are here:", posts);
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

        const date = new Date().toLocaleString();
        const newPost = { id: newPostID, date: date, reaction: {thumb: 0, heart: 0, java: 0}, ...data }; //add new add to post
        allPosts.push(newPost); //add new post to all posts

        //writing the posts with the new posts to json
        const post = JSON.stringify(allPosts, null, 2);

        fs.writeFile('./json/data.json', post, (err) => {
            if (err) throw err;
        });
        return newPost;
    }

    static addComment(id, comment) {
        let comments = [];
        const allPosts = this.allPosts;
        allPosts.forEach(post => {
            if(id === post.id) {
                 if(post.hasOwnProperty("comments")) {
                    post.comments.push(comment)
                } else {
                    comments.push(comment);
                    post.comments = comments;
                }
            }   
        });

         //writing the posts with the new comments to json
         const newComment = JSON.stringify(allPosts, null, 2);

         fs.writeFile('./json/data.json', newComment, (err) => {
             if (err) throw err;
         });       
         
    }

    static postById(id) {
        const allPosts = this.allPosts;
        const post = allPosts.filter(post => post.id === id);
        if(post.length !== 0) {
            return post;
        } else {
            return 'Post not found'
        }

    }

    static addReaction(id, reaction_type) {
        const allPosts = this.allPosts;
        for(let i = 0; i < allPosts.length; i++) {
            if(id === allPosts[i].id) {
               allPosts[i].reaction[reaction_type] += 1;
                for(let j = 0; j < allPosts[i].reaction.length; j++) {
                    const reaction_keys =  Object.keys(allPosts[i].reaction[j]);
                    if(reaction_keys[0] === reaction_type) {
                        allPosts[i].reaction[j][reaction_type] +=1;

                        // writing the posts with the new reaction to json
                        const newReaction = JSON.stringify(allPosts, null, 2);

                        fs.writeFile('./json/data.json', newReaction, (err) => {
                            if (err) throw err;
                        }); 
                        return allPosts[i];
                    }
                }
        
            }
        }  
       return "Cannot add reaction / post does not exist"
    }

}

module.exports = Post;
