'use strict';
const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class user_permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user_permission.hasMany(models.Permission, {
        foreignKey: 'user_uuid',
        sourceKey: 'id'
      }
      )
    }
  }
  user_permission.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => uuidv4(), // Use uuidv4 function to generate UUID
    },
    user_uuid: {
      type: DataTypes.UUID,
      allowNull: false
    },
    permission_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Permission',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'user_permission',
    freezeTableName: true
  });
  return user_permission;
};