'use strict';

require('dotenv').config();

let timeRequst = require('../middleware /timestamp.js')
let logger = require('../middleware /logger.js')
let handelError = require('../middleware /404.js')
const express = require('express');
const app = express();
let docsData = require('../data/db.json');


//set up to run at the application level for all routes
// app.use(timeRequst);
app.use(logger);
app.use(express.json());



app.get('/', function (req, res) {
        res.send(docsData);
    
});

app.get('/products', (req, res) => {
    res.send(docsData.products);

})
app.post('/products', (req, res) => {
    
})
app.get('/products/:id', (req, res) => {})
app.put('/products/:id', (req, res) => {})
app.delete('/products/:id', (req, res) => {})


app.use(handelError);


module.exports = {
    server: app,
    start: port => {
        let PORT = port || process.env.port || 3000;
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
    }
};