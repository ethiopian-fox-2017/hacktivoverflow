var jwt = require('jsonwebtoken')
var User = require('../models/user')
require('dotenv').config()

module.exports = {
  isLoggedIn: function(req,res, next) {
    // console.log(req.headers);
    jwt.verify(req.headers.token, process.env.SECRETKEYS, function (err, decoded) {
        if(decoded) {
          req.body.decoded = decoded;
          User.findOne({username: decoded.username}, function(err, result) {
            if(err || result == null) {
              res.send('User not found, please sign up.')
            } else {
              next()
            }
          })
        } else {
          res.send(err);
        }
      })
  }
};
