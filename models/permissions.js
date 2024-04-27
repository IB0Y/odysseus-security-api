"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      console.log({models})
      Permission.belongsTo(models.Permission, {
        as: 'parent',
        foreignKey: 'parent_uuid'
      });
    }
  }
  Permission.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => uuidv4(), // Use uuidv4 function to generate UUID
        },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      attributes: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {
          create: false,
          edit: false,
          delete: false,
          view: false,
        },
      },
      parent_uuid: {
        type: DataTypes.UUID,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      user_uuid: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      resouce_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Permission",
      freezeTableName: true,
    }
  );
  return Permission;
};
