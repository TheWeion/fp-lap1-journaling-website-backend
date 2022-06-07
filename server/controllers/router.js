const express = require('express');
const router = express.Router();

const Post = require('../models/post');

router.post('/', (req, res) => {
    //const data = {"post": "hello world"};
    //console.log(req);
    const data = req.body;
    const newPost = Post.addPost(data);
    res.status(201).send(newPost);
});

module.exports = router;