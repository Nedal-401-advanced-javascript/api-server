  
'use strict';

const express = require('express');
const router = express.Router();
const product=require('../models/:model/:model.collection')
const category=require('../models/categories/categories.collection')
const getModel=require('../../middleware /model-finder')

router.param('model', getModel);


router.get('/api/v1/:model', function (req, res, next) {
    req.model.getAll().then(data => {
        res.status(200).json(data);
    }).catch(next);

});

router.get('/api/v1/:model/:id', (req, res, next) => {
    const id = req.params.id;
    req.model.get(id).then(data => {
        res.status(200).json(data);
    }).catch(next);

});

router.post('/api/v1/:model', (req, res, next) => {
    req.model.create(req.body)
        .then(data => {
            res.status(201).json(data);
        }).catch(next);
})

router.get('/api/v1/:model/:id', (req, res, next) => {
    req.model.get(req.params.id)
        .then(data => {
            res.status(201).json(data)
        }).catch(next);
})

router.put('/api/v1/:model/:id', (req, res, next) => {
    req.model.update(req.params.id, req.body)
        .then(data => {
            res.status(201).json(data)
        }).catch(next);

})

router.delete('/api/v1/:model/:id', (req, res, next) => {
    req.model.delete(req.params.id)
        .then(data => {
            res.send(data);
        }).catch(next);
})


function getModel (req, res, next) {
    let model = req.params.model;
    switch(model) {
        case "categories":
            req.model = category;
            next();
            break;
        case "products":
            req.model = product;
            next();
            break;
        default:
            next("Invalid Model!!! ");
            break;
    }
}
module.exports = router;
