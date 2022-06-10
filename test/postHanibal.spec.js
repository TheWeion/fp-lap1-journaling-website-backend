const Post = require('../models/post');
const fs = require('fs');
const { response } = require('../server');
describe('Post model test', () => {
    const testData = {
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
    it('Should return error when adding comment to post if post does not exist', () => {
        const comment = Post.addComment(200);
        expect(comment).toBe('error');
    })
    it('Should return error when adding reactions to non-existent post', () => {
        const reaction = Post.addReaction(200, 'thumb')
        expect(reaction).toBe('Cannot add reaction / post does not exist');
    })
    // describe('Mocking the post class', () => {
    //     jest.mock('fs');
    //     jest.mock('../models/post')
    //     beforeEach(() => {
    //         // Clear all instances and calls to constructor and all methods:
    //         Post.addPost.mockClear();
    //       });
    //       it('We can check if the consumer called the class constructor', () => {
    //         const post = new Post(testData);
    //         expect(post).toHaveBeenCalledTimes(1);
    //       });

    //       it('it should write new post', async () => {
    //         //Somehow need to test the post method
    //         expect(jest.isMockFunction(Post.addPost(testData))).toBeTruthy();
    //         Post.addPost(testData).mockReturnValue('test string');
    //         require('./');
    //         //const newPost = Post.addPost(testData);
    //         //expect(newPost.id).toEqual(postsData.length+1);
    //     })
    // })
    
    describe('Mocking testing fs', () => {
        jest.mock('fs');
        it('Should add new post and return it', () => {
            //const response = {data: testData};
            //jest.spyOn(fs, 'writeFile').mockImplementation(() => Promise.resolve(response));

            jest.spyOn(fs, 'writeFile').mockImplementation();
            const result = Post.addPost(testData);
            expect(fs.writeFile).toHaveBeenCalled();
            expect(typeof result).toEqual('object');

            expect(typeof result.id).toEqual('number');
            
        })
        it('Should add new comment to a post and return it', () => {
            jest.spyOn(fs, 'writeFile').mockImplementation();
            const result = Post.addComment(1, 'testing comments');
            expect(fs.writeFile).toHaveBeenCalled();
            expect(typeof result).toEqual('string');
            expect(result).toBe('success');
        })
        it('Should comment array in the specified post if it doesn\'t exist', () => {
            jest.spyOn(fs, 'writeFile').mockImplementation();
            const result = Post.addComment(1, 'testing comments');
            expect(fs.writeFile).toHaveBeenCalled();
            expect(typeof result).toEqual('string');
            expect(result).toBe('success');
        })
        it('should return an error when adding a comment to non-existent post id', () => {
            jest.spyOn(fs, 'writeFile').mockImplementation();
            const result = Post.addComment(100, 'testing comments');
            expect(fs.writeFile).toHaveBeenCalled();
            expect(typeof result).toEqual('string');
            expect(result).toBe('error');
        })
        it('Should increment the specified reaction to the post id', () => {
            jest.spyOn(fs, 'writeFile').mockImplementation();
            const result = Post.addReaction(1, 'thumb');
            expect(fs.writeFile).toHaveBeenCalled();
            expect(typeof result).toEqual('object');
        })
        it('Should return error message when adding reaction to non-existent post', () => {
            jest.spyOn(fs, 'writeFile').mockImplementation();
            const result = Post.addReaction(300, 'thumb');
            expect(fs.writeFile).toHaveBeenCalled();
            expect(typeof result).toEqual('string');
            expect(result).toEqual('Cannot add reaction / post does not exist');
        })
        
    })
})