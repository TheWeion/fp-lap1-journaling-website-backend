// controller
const Post = require('../models/post');
const express = require('express');
//const { router } = require('../server');
const router = express.Router();

router.get('/', (req, res) => {
    const allData = Post.getAll;
    res.send(allData);
    
})


module.exports = router;
