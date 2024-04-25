"use strict";
const { Model } = require("sequelize");
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
  permission.init(
    {
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
      modelName: "permission",
      freezeTableName: true,
    }
  );
  return permission;
};
