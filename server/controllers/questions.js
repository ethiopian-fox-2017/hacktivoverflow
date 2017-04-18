const Question = require('../models/questions'),
      User = require('../models/users')
      Helpers = require('../helpers/authentication')

module.exports = {
  post : function(req, res){
    let decoded = Helpers.decodeToken(req.headers.token);
    console.log(decoded._doc);
    Question.create({
      author : decoded._doc._id,
      title : req.body.title,
      post : req.body.post
    },(err, data) => {
      if (err){
        res.json({success : false, data : null, msg : 'gagal cuy'})
      }
      else{
        var question = data,
            selfQuestion = data
        User.update({_id :decoded._doc._id},
              {
                $push: {questions :  question._id }
              },{new : true},function (err, question) {
                if (err){
                  res.json({success : false, msg : err.message })
                }
              else{
                console.log('jalan');
                res.json({success : true, msg : 'success add question' , question : selfQuestion})
              }
              })
      }

    })
  },
  delete : function(req, res){
    Question.findByIdAndRemove(req.params.id)
            .exec((err, question) => {
              if(err || question == null)
                res.json({success : false, msg : 'gagal cuy'})
              else{
                var data = question
                User.update( {_id : data.author}, { $pullAll: { questions : [data._id] } })
                    .exec((err, data) => {
                      console.log(data);
                      res.json(err)
                    })
              }

            })
  },
  giveVote : function(req, res){

    Question.findById(req.params.id,(err , data) => {
      if (err || data == null){
          console.log('sudah');
      }else {
        let votes = data.votes
        let ada = votes.some(vote => vote.user_id == req.body.user_id)
        if (ada)
          res.json({success : false, msg : 'sudah pernah ngevote cuy'})
        else{
          Question.update({_id : data._id},
            {$push : { votes : {number : req.body.number, user_id : req.body.user_id}}}, {new : true}
          ).exec((err, data) => {
            if (err)
              res.json({success : false, msg : err.message})
            else
              res.json({success : true, msg : 'success add skill'})
          })
        }
      }
    })
  },
  answerGiveVotes : function(req, res){
    var decoded = Helpers.decodeToken(req.headers.token);
    var user_id = decoded._doc._id
    Question.findOne({'_id' : req.params.id, 'answers._id' : req.body.answer},{'answers.$' : 1}, (err, question) => {
      if (err || question == null){
        res.json({success : false, msg : 'apaan'})
      }else {
        let isExist = question.answers[0].votes.some(x => x.user == req.body.user)

        if (isExist){
          res.json({success : false, msg : 'you already vote'})
        }else {
          Question.findOneAndUpdate({
            '_id' : req.params.id,
            'answers._id' : req.body.answer
          },{
            $push : {'answers.$.votes' : {'number' : req.body.number, 'user_id' : user_id}}},
            {new : true}, (err, data) => {
              if (err) res.json({success : false, msg : 'gagal cuy'})
              else
                res.json({success : true, data : data})
            })
        }
      }
    })
  },

  giveAnswer : function(req, res){
    let decoded = Helpers.decodeToken(req.headers.token);
      console.log('tokennya',decoded._doc._id);
    Question.findOneAndUpdate({_id : req.params.id},{
      $push : {answers : { user : decoded._doc._id, answer : req.body.answer}}
    },(err, data) => {
      if (err || data == null){
        res.json({success : false, msg : 'gagal cuy'})
      }else {
        console.log(data.answers);
        res.json({success : true, msg : 'sukses cuy', data : data})
      }
    })
  },

  grabAll : function(req, res){
    Question.find({})
      .populate('author')
      .exec((err, question) => {
      console.log(err, question);
      if (err || question == null)
        res.json({success : false, msg : 'error', questions : null})
      else
        res.json({success : true, msg : 'success', questions : question})
    })
  },

  getById : function(req, res){
    Question.findById(req.params.id)
            .populate('author answers.user')
            .exec((err, question) =>{
                  if (err || question == null){
                    res.json({success : false, msg : 'failed to get question', question : null})
                  }
                  else{
                    res.json({success : true, msg : 'success to get question', question : question})
                  }

                })

  },
  deleteQuestion : function(req, res) {
    let data = Helpers.decodeToken(req.headers.token)
    console.log(data._doc._id);
    User.findById('58f4988644243b8d1333dc58')
        .populate('questions')
        .exec((err, user) => {
            if (err || user == null){
              res.json({success : false, user : user})
            }else {
              let index = user.questions.findIndex((val)=> val._id == req.params.id)
              console.log(index);
              if (index == -1){
                res.json({success : false, user : user})
              }else {
                user.questions.pull(req.params.id)
                user.save()
                Question.findByIdAndRemove(req.params.id)
                        .exec((err, question) => {
                          if (err || question == null){
                            res.json({success : false, question : null})
                          }else {
                            res.json({success : true, question : question})
                          }
                        })

              }

            }
        })
    // Question.findByIdAndRemove(req.params.id)
    //         .exec((err, question) =>{
    //           if (err){
    //             res.json({success : false, err : 'error cuy', question : null})
    //           }
    //           else {
    //             res.json({success : true, err : null, question: question})
    //           }
    //         })
  },

  updateQuestion : function(req, res){
    Question.findByIdAndUpdate(req.params.id,{$set : req.body},{new : true})
      .exec(( err, question ) => {
        if (err) res.json({success : false, data : null})
        res.json({success : true, data : question})
      })
  }





}
