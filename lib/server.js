'use strict';

require('dotenv').config();

let timeRequst = require('../middleware /timestamp.js')
let logger = require('../middleware /logger.js');
let handelError = require('../middleware /404.js');
let serverErr = require('../middleware /500');
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const categoriesRout = require('../routes/categories')
const productRout = require('../routes/product')

const product = require('./models/products/products.collection')
const category = require('./models/categories/categories.collection')

//set up to run at the application level for all routes
app.use(timeRequst);
app.use(logger);
app.use(express.json());
// 3rd party middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(categoriesRout, productRout);
// app.use(productRout);

app.get('/',(req,res,next)=>{
    category.getAll()
    .then(data1=>{
        product.getAll()
        .then(data => {
            res.status(200).json({
                product:data,
                category:data1
            });
    })
    }).catch(next);
})

app.use('*',handelError);
app.use(serverErr   )


module.exports = {
    server: app,
    start: port => {
        let PORT = port || process.env.port || 3000;
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
    }
};