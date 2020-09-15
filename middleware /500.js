'use strict';
module.exports=(req, req, res, next)=> {
    console.log("Server side Error 500")
    res.status(500);
    res.json({ error: err });
  }

// we have to have 4 arguments for the error Handler
