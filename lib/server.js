'use strict';

require('dotenv').config();

let timeRequst = require('../middleware /timestamp.js')
let logger = require('../middleware /logger.js')
let handelError = require('../middleware /404.js')
const express = require('express');
const app = express();
let docsData = require('../data/db.json');


//set up to run at the application level for all routes
app.use(timeRequst);
app.use(logger);
app.use(express.json());



app.get('/', function (req, res) {
    res.send(docsData);

});

app.get('/products', (req, res) => {
    res.send(docsData.products);

});
app.get('/categories', (req, res) => {
    console.log(req,'<<<<<<<<<<<<<<<<<<');
    res.send(docsData.categories);

})
app.post('/products', createObj(), (req, res) => {
    console.log(docsData.products);
    res.status(201).json(docsData.products);
})

app.get('/products/:id', findId(), (req, res) => {
    res.status(201).json(req.choosed)
})

app.put('/products/:id',findId(),update(), (req, res) => {
    res.status(201).json(req.choosed)

})

app.delete('/products/:id',findId(), deleteId(), (req, res) => {
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




app.use(handelError);


module.exports = {
    server: app,
    start: port => {
        let PORT = port || process.env.port || 3000;
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
    }
};