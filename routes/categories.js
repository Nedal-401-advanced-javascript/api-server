'use strict';

const express = require('express');
const router = express.Router();
const category = require('../lib/models/categories/categories.collection')


router.get('/categories', function (req, res, next) {
    category.getAll().then(data => {
        res.status(200).json(data);
    }).catch(next);

});

router.get('/categories/:id', (req, res, next) => {
    const id = req.params.id;
    category.get(id).then(data => {
        res.status(200).json(data);
    }).catch(next);

});

router.post('/categories', (req, res, next) => {
    category.create(req.body)
        .then(data => {
            res.status(201).json(data);
        }).catch(err => {
            // or do .catch(next) like the getFood function
            console.log(err);
            next(err);
        });
})

router.get('/categories/:id', (req, res, next) => {
    category.get(req.params.id)
        .then(data => {
            res.status(201).json(data)
        }).catch(next);
})

router.put('/categories/:id', (req, res, next) => {
    category.update(req.params.id, req.body)
        .then(data => {
            res.status(201).json(data)
        }).catch(next);

})

router.delete('/categories/:id', (req, res, next) => {
    category.delete(req.params.id)
        .then(data => {
            res.send(data);
        }).catch(next);
})

module.exports = router;
