'use strict';
module.exports=(req, res, next)=>{
    req.Date.now();
    next();

};

