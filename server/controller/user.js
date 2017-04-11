const User = require('../models/user')
const pwHash = require('password-hash')

module.exports = {

  createUser : (req, res)=> {
    let newUser = User({
      username: req.body.username,
      password: pwHash.generate(req.body.password)
    })
    newUser.save((err)=> {
        if(err) {
          res.send(err)
        } else {
          res.send(`${req.body.username} added into Database`)
        }
    })
  },
  listUser : (req, res)=> {
    User.find({})
      // .populate('questionId answerId voteId')
      .exec((err, users)=> {
      if(err) {
        res.send(err)
      } else {
        res.send(users)
      }
    })
  },
  deleteUser : (req, res)=> {
    User.findByIdAndRemove(req.params.objectId, (err, user)=> {
      if(err){
        res.send(err)
      } else {
        res.send(`User ${user.name} deleted`)
      }
    })
  },
  editUser : (req, res)=> {
    User.findOne({_id: req.params.objectId}, (err, user)=> {
      if(err) {
        res.send(err)
      } else {
        user.username = req.body.username ? req.body.username : user.username
        user.password = req.body.password ? pwHash.generate(req.body.password) : user.password
        User.save()
      }
    })
  }
}