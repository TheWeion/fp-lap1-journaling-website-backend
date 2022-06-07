//const request = require('supertest');
const post = require('../models/post');
const server = require('../server');
const json = require('../json/data.json')


describe('Test fs read function', () => {
    test('returns a type of object', () => {
        expect (typeof post.allPosts).toBe('object');
    })
});


describe('Test data in JSON file', () => {
    test('Id is a number', () => {
        for(let i =0; i<json.length; i++) {
            expect(typeof json[i].id).toBe('number');
        }
    })

    test('Comment is a string', () => {
        for(let i=0; i<json.length; i++){ 
            expect(typeof json[i].post).toBe('string');
        }
    })

    test('Gif is a string', () => {
        for(let i=0; i<json.length; i++){ 
            expect(typeof json[i].gif).toBe('string');
        }
    })

})
