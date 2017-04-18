'use strict';
module.exports = function(sequelize, DataTypes) {
  var Question = sequelize.define('Question', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Question.belongsTo(models.User);
        Question.hasMany(models.Answer);
        Question.hasOne(models.Vote);
      }
    }
  });
  return Question;
};
