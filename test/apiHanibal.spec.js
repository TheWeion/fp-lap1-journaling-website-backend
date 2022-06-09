const request = require('supertest');
// import server
const server = require('../server');
const Post = require('../models/post');
const fs = require('fs');


describe('API server', () => {
    let api;
    const testData = {
        post: 'This is a testing post',
        gif: 'Some random gif'
    }
    beforeAll(() => {
        // start the server and store it in the api variable
        api = server.listen(5000, () =>
            console.log('Test server running on port 5000')
        );
    });

    afterAll((done) => {
        // close the server, then run done
        console.log('Gracefully stopping test server');
        api.close(done);
    });

    it('responds to get / with status 200', (done) => {
        request(api).get('/').expect(200, done);
    });

    it('responds with all posts', (done) => {
        const posts = Post.allPosts;
        request(api)
        .get('/status')
        .expect(200)
        .expect(posts, done)
    })
    it('responds with post by id', (done) => {
        const post = Post.postById(1);
        request(api)
        .get('/status/1')
        .expect(200)
        .expect(post, done)
    })
    it('responds 404 when requesting a non-existent post', (done) => {
        request(api)
        .get('/status/100')
        .expect(404)
        .expect('Post not found', done)
    })
    it('responds with 404 when adding comment to non-existent post', (done) => {
        const body = {
            comment: "hello there"
        }
        request(api)
        .post('/status/100')
        .send(body)
        .expect(404)
        .expect('Post ID does not exist', done)
    })
    it('responds with 404 when adding reaction to non-existent post', (done) => {
        request(api)
        .post('/status/reaction/100/like')
        .expect(404)
        .expect('Cannot add reaction / post does not exist', done)
    })
    // it('responds to post /dogs with status 201', async (done) => {
    //     request(api)
    //         .post('/')
    //         .send(testData)
    //         .set('Accept',  /application\/json/)
    //         .expect(201)
    //         .expect({id: 2, ...testData}, done);
    // })
    describe('Mock fs', () => {
        jest.mock('fs');
        it("Should add post and return it", (done) => {
            const body = {
                post: "testing post - ignore",
                gif: "some gif url"
            }
            jest.spyOn(fs, 'writeFile').mockImplementation();
            request(api)
            .post('/')
            .send(body)
            .expect(201, done)
            
        })
        it("Should add comment to post id", (done) => {
            const body = {
                comment: "testing comment - ignore",
            }
            jest.spyOn(fs, 'writeFile').mockImplementation();
            request(api)
            .post('/status/1')
            .send(body)
            .expect(200, done)
            
        })
        it('responds with 200 when adding reaction to existent post', (done) => {
            request(api)
            .post('/status/reaction/9/thumb')
            .expect(200, done)
        })
    })
})