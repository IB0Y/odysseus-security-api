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
    permission_uuid: {
      type: DataTypes.UUID
    },
    user_uuid: {
      type: DataTypes.UUID
    },
    update: {
      type: DataTypes.JSONB
    },
    reason: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'logs',
  });
  return logs;
};