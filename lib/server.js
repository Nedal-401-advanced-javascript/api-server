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
const masterRout=require('./routes/api-v1')
// const masterModul=require('./models/model')



//set up to run at the application level for all routes
app.use(timeRequst);
app.use(logger);
app.use(express.json());
// 3rd party middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(masterRout);
// app.use(masterModul);



app.use('*',handelError);
// app.use(serverErr   )


module.exports = {
    server: app,
    start: port => {
        let PORT = port || process.env.port || 3000;
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
    }
};