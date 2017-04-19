var jwt = require('jsonwebtoken')
var User = require('../models/user')
require('dotenv').config()

module.exports = {
  showCurrentUser: function(req, res, next) {
    //console.log('show');
    //console.log('ini token ', req.headers.token);
    jwt.verify(req.headers.token, process.env.SECRETKEYS, function (err, decoded) {

        if(decoded) {
          console.log('decoded ', decoded);
          User.findOne({_id: decoded.user}, function(err, result) {
            if(err || result == null) {
              res.send(err)
            } else {
              res.send(result)
            }
          })
        } else {
          res.send(err);
        }
      })
  }
};
