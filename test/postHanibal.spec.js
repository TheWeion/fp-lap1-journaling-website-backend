const Post = require('../models/post');
const fs = require('fs');
describe('Post model test', () => {
    const testData = {
        post: 'This is a testing post',
        gif: 'Some random gif'
    }
    const content = fs.readFileSync('./server/json/testData.json', { encoding: 'utf8' });
    const postsData = JSON.parse(content);
    it('it should make an instance of a post', () => {
        const post = new Post({id:1, ...testData});

        expect(post.id).toBe(1);
        expect(post.post).toBe('This is a testing post');
        expect(post.gif).toBe('Some random gif');
    })
    it('Should return all posts', async () => {
        const posts = await Post.allPosts;

        expect(posts).toEqual(postsData);
    })
    it('it should write new post', async () => {
        //Somehow need to test the post method
        jest.mock('../models/post');
        
        const newPost = Post.addPost(testData);
        expect(newPost.id).toEqual(postsData.length+1);
    })
})