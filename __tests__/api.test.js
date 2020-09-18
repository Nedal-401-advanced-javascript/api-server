'use strict';
const { server } = require('../lib/server')//fake server will be sent to supertest in supergoose
const supergoose = require('@code-fellows/supergoose')
const mockReq = supergoose(server);

describe("Every route should respond with the right status code and the expected data", () => {
    it("check the post rout ", async () => {
        let newProduct = {
            category: "food",
            name: "apple",
            display_name: "true",
            description: "it is kind of food"
        }
        let dataRequsted = await mockReq.post('/api/v1/products').send(newProduct);
        let record = dataRequsted.body;
        Object.keys(newProduct).forEach(key => {
            expect(record[key]).toEqual(newProduct[key]);
            expect(dataRequsted.status).toBe(201)
        })

    })

    it('check the get rout', async () => {

        let newProduct2 = {
            category: "electronic",
            name: "Dell",
            display_name: "true",
            description: "PC and chargers"
        }
        let postedData = await mockReq.post('/api/v1/products').send(newProduct2);
        let record = postedData.body;
        let dataRes = await mockReq.get(`/api/v1/products/${record._id}`);
        let getRespons = dataRes.body;


        Object.keys(newProduct2).forEach(key => {
            expect(getRespons[0][key]).toEqual(newProduct2[key])
        });
        expect(dataRes.status).toBe(200)


    })

    it('testing the get all method ', async () => {
        let record = await mockReq.get('/api/v1/products')
        expect(record.body.length).toEqual(2);

    })

    it('check the put rout', async () => {

        let newProduct3 = {
            category: "electronic",
            name: "HP",
            display_name: "true",
            description: "PC and chargers"
        }
        let newProduct4 = {
            category: "electronic",
            name: "IBM",
            display_name: "true",
            description: "PC and chargers"
        }
        let postedData = await mockReq.post('/api/v1/products').send(newProduct3);
        let record = postedData.body;
        let dataPut= await mockReq.put(`/api/v1/products/${record._id}`).send(newProduct4);
        let dataRes = await mockReq.get(`/api/v1/products/${record._id}`);

        let getRespons = dataRes.body;

        Object.keys(newProduct3).forEach(key => {
            expect(getRespons[0][key]).toEqual(newProduct4[key])
        });
        expect(dataPut.status).toBe(201)


    })

})