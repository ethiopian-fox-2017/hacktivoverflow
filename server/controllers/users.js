var User = require('../models/users'),
    passwordHash = require('password-hash'),
    jwt = require('jsonwebtoken')

module.exports = {
  register : function(req, res){
    User.create({
        username : req.body.username,
        password : passwordHash.generate(req.body.password)
    }, (err, data) => {
      if (err)
        res.json({success: false, token : null, msg : err.message})
      else
        res.json({success : true, token : jwt.sign(data,'secret'), msg : 'sukses cuy'})
    })
  },
  signin : function(req, res){
    User.findOne({username : req.body.username}, (err, user) => {
      if (err){
        res.json({success : false, msg : 'login failed error: '+err, token : null})
      } else if(!user){
        res.json({success : false, msg : 'login failed because user not found', token : null})
      }
      else{
        console.log(user.password);
        if (passwordHash.verify(req.body.password, user.password)){
          res.json({success : true, msg : 'Login success', token : jwt.sign(user, 'secret')})
        }else {
          res.json({success : false, msg : 'Login failed wrong password', token : null})
        }

      }

    })
  },
  getAll : function (req, res) {
    User.find(function (err, users){
      if(err){
        res.json({error: err});
      } else {
        res.json(users);
      }
    })
  },

  getProfile : function(req,res) {
    let profile = Helpers.decodeToken(req.params.token)
    User.findById(profile._doc._id)
        .populate('questions')
        .exec((err, user) => {
          if (err || user == null){
            res.json({success : false, user : null})
          }else {
            res.json({success : true, user : user})
          }
        })
  }
}
