'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class logs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  logs.init({
    permission_uuid: DataTypes.UUID,
    user_uuid: DataTypes.UUID,
    update: DataTypes.JSONB,
    reason: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'logs',
  });
  return logs;
};