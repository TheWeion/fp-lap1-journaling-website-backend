const Post = require('../models/post');
const fs = require('fs');
describe('Post model test', () => {
    const testData = {
        id: 1,
        post: 'This is a testing post',
        gif: 'Some random gif'
    }
    const content = fs.readFileSync('./json/testData.json', { encoding: 'utf8' });
    const postsData = JSON.parse(content);
    it('it should make an instance of a post', () => {
        const post = new Post({id:1, ...testData});

        expect(post.id).toBe(1);
        expect(post.post).toBe('This is a testing post');
        expect(post.gif).toBe('Some random gif');
    })
    it('Should return all posts', () => {
        const posts = Post.allPosts;
        expect(typeof posts).toBe('object');
    })
    it('Should return post by id', () => {
        const post = Post.postById(1);
        expect(typeof post).toBe('object');
    })
    it('Should return error message if post does not exist', () => {
        const post = Post.postById(20);
        expect(post).toBe('Post not found');
    })
    describe('Mocking the post class', () => {
        jest.mock('fs');
        jest.mock('../models/post')
        beforeEach(() => {
            // Clear all instances and calls to constructor and all methods:
            Post.addPost.mockClear();
          });
          it('We can check if the consumer called the class constructor', () => {
            const post = new Post(testData);
            expect(post).toHaveBeenCalledTimes(1);
          });

          it('it should write new post', async () => {
            //Somehow need to test the post method
            expect(jest.isMockFunction(Post.addPost(testData))).toBeTruthy();
            Post.addPost(testData).mockReturnValue('test string');
            require('./');
            //const newPost = Post.addPost(testData);
            //expect(newPost.id).toEqual(postsData.length+1);
        })
    })
})