'use strict';
module.exports = function(sequelize, DataTypes) {
  var Uservote = sequelize.define('Uservote', {
    UserId: DataTypes.INTEGER,
    VoteId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Uservote.belongsTo(models.User);
        Uservote.belongsTo(models.Vote);
      }
    }
  });
  return Uservote;
};
