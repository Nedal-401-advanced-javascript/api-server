'use strict';

const express = require('express');
const router = express.Router();
let docsData = require('../data/db.json');


router.get('/', function (req, res) {
    res.send(docsData);

});

router.get('/categories', (req, res) => {
    res.send(docsData.categories);

});

router.post('/categories', createObj(), (req, res) => {
    console.log(docsData.categories);
    res.status(201).json(docsData.categories);
})

router.get('/categories/:id', findId(), (req, res) => {
    res.status(201).json(req.choosed)
})

router.put('/categories/:id', findId(), update(), (req, res) => {
    res.status(201).json(req.choosed)

})

router.delete('/categories/:id', findId(), deleteId(), (req, res) => {
    res.send(docsData.categories);
})

function createObj() {
    return (req, res, next) => {
        let categorie = req.body;
        categorie.id = docsData.categories.length + 1;
        docsData.categories.push(categorie);
        next()
    }
}

function findId() {
    return (req, res, next) => {
        docsData.categories.forEach((element, i) => {
            if (element.id === req.params.id) {
                req.choosed = element;
                req.choosedIndex = i;
            }
        });
        req.choosed ? next() : next('Not found')
    }
}

function update() {
    return (req, res, next) => {
        Object.keys(req.body).forEach(key => {
            req.choosed[key] = req.body[key]
        })
        next()

    }
}

function deleteId() {
    return (req, res, next) => {
        docsData.categories.splice(req.choosedIndex, 1)
        next();
    }
}

module.exports = router;
