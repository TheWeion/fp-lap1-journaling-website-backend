const request = require('supertest');
// import server
const server = require('../server');

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
    // it('responds to post /dogs with status 201', async (done) => {
    //     request(api)
    //         .post('/')
    //         .send(testData)
    //         .set('Accept',  /application\/json/)
    //         .expect(201)
    //         .expect({id: 2, ...testData}, done);
    // })
})