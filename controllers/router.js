const express = require('express');
const router = express.Router();

const Post = require('../models/post');

router.get('/status', (req, res) => {
    const postData = Post.allPosts;
    res.status(200).send(postData);
});

router.post('/', (req, res) => {
    //const data = {"post": "hello world"};
    //console.log(req);
    const data = req.body;
    const newPost = Post.addPost(data);
    res.status(201).send(newPost);
});

router.post('/status/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const comment = req.body.comment;
    const newComment = Post.addComment(id, comment);
    res.status(200).send('Comment added to the JSON file');
})

router.get('/status/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = Post.postById(id);
    if(typeof post === 'object'){
        res.status(200).send(post);
    } else {
        res.status(404).send(post);
    }
})

router.post('/status/reaction/:id/:reaction_type', (req, res) =>{
    const id = parseInt(req.params.id);
    const reaction_type = req.params.reaction_type;
    const reaction = Post.addReaction(id, reaction_type);
    if(typeof reaction === 'object'){
        res.status(200).send(reaction);
    } else {
        res.status(404).send(reaction);
    }
    
})

module.exports = router;
