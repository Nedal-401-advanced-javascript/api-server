'use strict';
require('@code-fellows/supergoose');
const product = require('../lib/models/products/products.collection')
const catigory = require('../lib/models/categories/categories.collection');
const { create } = require('../lib/models/products/products.schema');

describe('CRUD tests for collection classes', () => {
    it('can create, update and getAll', async () => {
        let newProduct = {
            category: "food",
            name: "apple",
            display_name: "true",
            description: "it is kind of food"
        }
        let productToUpdate = {
            category: "food",
            name: "orang",
            display_name: "true",
            description: "it is kind of food"
        }
        let result = await product.create(newProduct)
        Object.keys(newProduct).forEach(key => {
            expect(result[key]).toEqual(newProduct[key]);
        })

        await product.update(result._id,productToUpdate);
        let getAllData=await product.getAll()
        console.log('get all >>>>>>>>>', getAllData);
        Object.keys(productToUpdate).forEach(key=>{
            expect(getAllData[0][key]).toEqual(productToUpdate[key])
        })
        
        
    });
    it('can get and delete', async() => {
        let newCategory = {
            name: "tools",
            display_name: "true",
            description: "collection of hand tools for technican"
        }
        let result=await catigory.create(newCategory);
        let record=await catigory.get(result._id)
        Object.keys(newCategory).forEach(key=>{
            expect(record[0][key]).toEqual(newCategory[key])
        })
        expect(record.length).toEqual(1)

        let deleteProduct=await catigory.delete(result._id)
        record=await catigory.get(result._id)
        expect(deleteProduct._id).toEqual(result._id)
        expect(record.length).toEqual(0)
    })

})