const Post = require('../models/post');

describe('Post model test', () => {
    const testData = {
        post: 'This is a testing post',
        gif: 'Some random gif'
    }
    it('it should make an instance of a post', () => {
        const post = new Post({id:1, ...testData})
    })
})