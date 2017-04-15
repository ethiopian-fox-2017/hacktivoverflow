'use strict';
var passHash = require('password-hash');
var jwt = require('jsonwebtoken');
require('dotenv').config();

var check = {};
check.verify = function(req,res,next){
  console.log(req.headers)
  jwt.verify(req.headers.token, process.env.SECRETKEYS, (error,data) => {
    if(!data){
      res.send(error);
    } else {
      console.log(data);
      next()
    }
  });
}

module.exports = check
