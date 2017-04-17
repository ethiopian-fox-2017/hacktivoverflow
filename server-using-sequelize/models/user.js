'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    VoteId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.hasMany(models.Uservote);
        User.belongsToMany(models.Vote,{through: 'Uservote'});
        User.hasMany(models.Question);
        User.hasMany(models.Answer);
      }
    }
  });
  return User;
};
