'use strict';
module.exports = function(sequelize, DataTypes) {
  var Answer = sequelize.define('Answer', {
    content: DataTypes.STRING,
    QuestionId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Answer.belongsTo(models.User);
        Answer.belongsTo(models.Question);
        Answer.hasOne(models.Vote);
      }
    }
  });
  return Answer;
};
