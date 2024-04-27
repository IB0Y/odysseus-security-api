const database = require("../models");
const consola = require("consola")
const ResponseService = require("../utils/responses");
const PermissionModel = database.Permission;

class Permissions {
    async addPermissions(req, res, next) {
        try {
            const {name, parent_uuid, isActive, attributes, user_uuid, resouce_id} = req.body;
            const permissions = await PermissionModel.create({
                name,
                parent_uuid,
                isActive,
                attributes,
                user_uuid,
                resouce_id
            });

            return ResponseService.success({
                res,
                status: 200,
                data: permissions,
                message: "Permission added successfully",
            });
        } catch (error) {
            consola.log(error);
            return ResponseService.serverError({res});
        }
    }

    async fetchPermissionsByUserUUID(req, res, next) {
        try {
            const {user_uuid} = req.params;

            const permissions = await PermissionModel.findAll({
                where: {
                    user_uuid,
                },
                include: [
                    {
                        model: PermissionModel,
                        as: 'parent'
                    }
                ],
            });

            return ResponseService.success({
                res,
                status: 200,
                data: permissions,
                message: "Permission fetched successfully",
            });
        } catch (error) {
            consola.log(error);
            return ResponseService.serverError({res});
        }
    }

    async fetchPermissionsByUUID(req, res, next) {
        try {
            const {permission_uuid: id} = req.params;

            const permissions = await PermissionModel.findOne({
                where: {
                    id,
                },
                include: [
                    {
                        model: PermissionModel,
                        as: 'parent'
                    }
                ],
            });

            return ResponseService.success({
                res,
                status: 200,
                data: permissions,
                message: "Permission fetched successfully",
            });
        } catch (error) {
            consola.log(error);
            return ResponseService.serverError({res});
        }
    }

    async fetchPermissionsByResourceId(req, res, next) {
        try {
            const {resouce_id, user_uuid} = req.params;

            const permissions = await PermissionModel.findOne({
                where: {
                    resouce_id,
                    user_uuid,
                },
                include: [
                    {
                        model: PermissionModel,
                        as: 'parent'
                    }
                ],
            });

            return ResponseService.success({
                res,
                status: 200,
                data: permissions,
                message: "Permission fetched successfully",
            });
        } catch (error) {
            consola.log(error);
            return ResponseService.serverError({res});
        }
    }

    async updatePermissions(req, res, next) {
        try {
            const {permission_uuid: id} = req.params;
            const {
                name,
                parent_uuid,
                isActive,
                attributes
            } = req.body;

            let permission = await PermissionModel.update(
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

            if (permission > 0) {
                permission = await PermissionModel.findByPk(id);
            }

            return ResponseService.success({
                res,
                status: 201,
                data: permission,
                message: "Permission updated successfully",
            });
        } catch (error) {
            consola.log(error);
            return ResponseService.serverError({res});
        }
    }

    async deletePermissions(req, res, next) {
        try {
            const {permission_uuid: id} = req.params;
            await PermissionModel.destroy(
                {
                    where: {
                        id,
                    },
                }
            );

            return ResponseService.success({
                res,
                status: 201,
                message: "Permission updated successfully",
            });
        } catch (error) {
            consola.log(error);
            return ResponseService.serverError({res});
        }
    }
}

module.exports = new Permissions();
