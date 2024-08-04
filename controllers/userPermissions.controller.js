const UserPermissionsService = require("../services/userPermissionsService");
const ResponseService = require("../utils/responses");
const consola = require("consola")

class UserPermissions {
    async getPermissions(req, res) {
        try {
            const permissions = await UserPermissionsService.getPermissions({
                user_uuid: req?.params?.user_uuid
            });
            return ResponseService.success({
                res,
                status: 200,
                data: permissions,
                message: "Permissions fetched successfully",
            });
        } catch (error) {
            consola.log(error);
            return ResponseService.serverError({ res });
        }
    }
    async addPermission(req, res) {
        try {
            const { user_uuid, permission_uuid } = req.body;
         
            const permission = await UserPermissionsService.addPermission({
                user_uuid, permission_uuid
            });
            return ResponseService.success({
                res,
                status: 200,
                data: permission,
                message: "Permission added successfully",
            });
        } catch (error) {
            consola.log(error);
            return ResponseService.serverError({ res });
        }
    }
    async deletePermission(req, res) {
        try {
            
            const permission = await UserPermissionsService.deletePermission(
                {
                    permission_uuid: req.params.permission_uuid
                }
            );
            return ResponseService.success({
                res,
                status: 204,
                data: permission,
                message: "Permission deleted successfully",
            });
        } catch (error) {
            consola.log(error);
            return ResponseService.serverError({ res });
        }
    }
    async updatePermission(req, res) {
        try {
            const permission = await UserPermissionsService.updatePermission({
                permission_uuid: req.params.permission_uuid,
                user_uuid: req.body.user_uuid
            });
            
            return ResponseService.success({
                res,
                status: 201,
                data: permission,
                message: "Permission updated successfully",
            });
        } catch (error) {
            consola.log(error);
            return ResponseService.serverError({ res });
        }
    }
}

module.exports = new UserPermissions();