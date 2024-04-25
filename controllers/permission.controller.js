const database = require("../models");
const { default: ResponseService } = require("../utils/responses");
const PermissionModel = database.permissions;

class Permissions {
  async addPermissions(req, res, next) {
    try {
      const { name, parent_uuid, isActive, attributes, user_uuid } = req.body;
      const permissions = await PermissionModel.create({
        name,
        parent_uuid,
        isActive,
        attributes,
        user_uuid,
      });

      return ResponseService.success({
        res,
        status: 200,
        data: permissions,
        message: "Permission added successfully",
      });
    } catch (error) {
      return ResponseService.serverError({ res });
    }
  }

  async fetchPermissionsByUUID(req, res, next) {
    try {
      const { user_uuid } = req.params;

      const permissions = await PermissionModel.findAll({
        where: {
          user_uuid,
        },
        include: [parent_uuid],
      });

      return ResponseService.success({
        res,
        status: 200,
        data: permissions,
        message: "Permission fetched successfully",
      });
    } catch (error) {
      return ResponseService.serverError({ res });
    }
  }

  async updatePermissions(req, res, next) {
    try {
      const { id } = req.params;
      const permissions = await PermissionModel.update(
        {
          name,
          parent_uuid,
          isActive,
          attributes,
        },
        {
          where: {
            id,
          },
        }
      );

      return ResponseService.success({
        res,
        status: 201,
        data: permissions,
        message: "Permission updated successfully",
      });
    } catch (error) {
      return ResponseService.serverError({ res });
    }
  }

  async deletePermissions(req, res, next) {
    try {
      const { id } = req.params;
      const permissions = await PermissionModel.update(
        {
          name,
          parent_uuid,
          isActive,
          attributes,
        },
        {
          where: {
            user_uuid,
          },
        }
      );

      return ResponseService.success({
        res,
        status: 201,
        data: permissions,
        message: "Permission updated successfully",
      });
    } catch (error) {
      return ResponseService.serverError({ res });
    }
  }
}


export default new Permissions();