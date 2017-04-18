'use strict';
module.exports = function(sequelize, DataTypes) {
  var Vote = sequelize.define('Vote', {
    amount: DataTypes.INTEGER,
    AnswerId: DataTypes.INTEGER,
    QuestionId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Vote.hasMany(models.Uservote);
        Vote.belongsToMany(models.User,{through: 'Uservote'});
        Vote.belongsTo(models.Question);
        Vote.belongsTo(models.Answer);
      }
    }
  });
  return Vote;
};
