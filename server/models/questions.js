require('../config/mongo')

const mongoose = require('mongoose'),
      uniqueValidator = require('mongoose-unique-validator'),
      Schema = mongoose.Schema,
      captainHook  = require('captain-hook'),
      stampIt = require('mongoose-stamp');

      answerSchema = new Schema({
        user : {type : Schema.Types.ObjectId, ref : 'User' },
        answer : String,
        votes : [{
         user_id : {type : Schema.Types.ObjectId, ref : 'User' },
         number : {
            type : Number,
            enum : [1, -1]
          }
        }]
      })

      questionSchema = new Schema({
        author : { type : Schema.Types.ObjectId, ref : 'User' },
        title : String,
        post : String,
        votes : [{
            user_id : {type : Schema.Types.ObjectId, ref : 'User' },
            number : {
              type : Number,
              enum : [1, -1]
            }
          }],
        answers : [answerSchema]
      });


//
// userSchema.pre('update', function(next){
//   // console.log('berubah');
//   let idSkill = this.getUpdate().$push.skills.id,
//       selfID = this._conditions._id;
//   this.findOne({_id : selfID}, (err, data) => {
//     console.log(idSkill,'ini skillnya, yang mau di update');
//     //
//     //console.log(data.skills);
//     if (data == null){
//         next(new Error('Not found id with this id'))
//     } else {
//       let isExist = data.skills.findIndex(skill => ''+skill.id == ''+idSkill) != -1//jika ada atau tidaknya -1 / 0
//       if (isExist)
//         next(new Error('Skillnya sudah ada cuy'));
//       else
//         next()
//     }
//
//   })
// })
//
// //userSchema.virtual('skills.id').get(function(){
// //  return this.skills
// //})
//
// userSchema.plugin(captainHook);
questionSchema.plugin(stampIt);
const Question = mongoose.model('Question', questionSchema)
// userSchema.preCreate(function(user, next){
//   console.log("You are about to create a user:" + user.name);
//   next();
// })
//
//
//
//
// // userSchema.plugin(uniqueValidator);
module.exports = Question
