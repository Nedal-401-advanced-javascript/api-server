'use strict';

const express = require('express');
const router = express.Router();
let docsData = require('../data/db.json');


router.get('/', function (req, res) {
    res.send(docsData);

});

router.get('/products', (req, res) => {
    res.send(docsData.products);

});

router.post('/products', createObj(), (req, res) => {
    console.log(docsData.products);
    res.status(201).json(docsData.products);
})

router.get('/products/:id', findId(), (req, res) => {
    res.status(201).json(req.choosed)
})

router.put('/products/:id',findId(),update(), (req, res) => {
    res.status(201).json(req.choosed)

})

router.delete('/products/:id',findId(), deleteId(), (req, res) => {
    res.send(docsData.products);
})

function createObj() {
    return (req, res, next) => {
        let product = req.body;
        product.id = docsData.products.length + 1;
        docsData.products.push(product);
        next()
    }
}

function findId() {
    return (req, res, next) => {
        docsData.products.forEach((element,i) => {
            if (element.id === req.params.id) {
                req.choosed = element;
                req.choosedIndex=i;
            }
        });
        req.choosed ? next() : next('Not found')
    }
}

function update() {
    return (req,res,next)=>{
        Object.keys(req.body).forEach(key=>{
        req.choosed[key]=req.body[key]
        })
        next()

    }
}

function deleteId() {
    return (req,res,next)=>{
        docsData.products.splice(req.choosedIndex, 1)
        next();
    }
}

module.exports = router;
