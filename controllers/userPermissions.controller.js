const ResponseService = require("../utils/responses");

class UserPermissions {
    async getPermissions(req, res) {
        try {
            const permissions = await UserPermissionsService.getPermissions(req.params.userId);
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
            const permission = await UserPermissionsService.addPermission(req.body);
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
            const permission = await UserPermissionsService.deletePermission(req.params.permissionId);
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
            const permission = await UserPermissionsService.updatePermission(req.params.permissionId, req.body);
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