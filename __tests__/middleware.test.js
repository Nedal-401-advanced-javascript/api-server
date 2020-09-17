'use strict';
const { server }  = require('../lib/server.js');

const supergoose = require('@code-fellows/supergoose')
const mockRequest = supergoose(server);


describe('web server', ()=> {

    it('should respond with 404 for not found routes', ()=>{
        return mockRequest.get('/category').then(result=>{
            expect(result.status).toBe(404);
        }).catch(err=> {
            console.log(err);
        });
    });
    it('should respond with 500 for bad routes', ()=>{
        return mockRequest.get(`/api/v1/products/${1}`).then(result=>{
            expect(result.status).toBe(500);
        }).catch(err=> {
            console.log(err);
        });
    });

});