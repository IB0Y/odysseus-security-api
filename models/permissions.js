'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  permission.init({
    name: DataTypes.TEXT,
    attributes: DataTypes.JSONB,
    parent_uuid: DataTypes.UUID,
    isActive: DataTypes.BOOLEAN,
    user_uuid: DataTypes.UUID,
  }, {
    sequelize,
    modelName: 'permission',
    freezeTableName: true,
  });
  return permission;
};