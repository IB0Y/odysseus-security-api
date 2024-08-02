const database = require('../models');
const UserPermission = database.user_permission;

/**
 * UserPermissionsService class
 * @class
 * @classdesc UserPermissionsService handles UserPermission operations
 * @static
 */
class UserPermissionsService {
 
    static async addPermission({user_uuid, permission_uuid}) {
        try {
            const permission = await UserPermission.create({user_uuid, permission_uuid});
            return permission;
        } catch (error) {
            throw error;
        }
    }

    // Fetch permissions by user_uuid
    
    static async getPermissions({user_uuid}) {
        try {
            const permissions = await UserPermission.findAll({
                where: {
                    user_uuid
                }
            });
            return permissions;
        } catch (error) {
            throw error;
        }
    }

    static async deletePermission({permission_uuid}) {
        try {
            const permission = await UserPermission.destroy({
                where: {
                    permission_uuid
                }
            });
            return permission;
        } catch (error) {
            throw error;
        }
    }

    static async updatePermission({permission_uuid, user_uuid}) {
        try {
            const permission = await UserPermission.update({user_uuid}, {
                where: {
                    permission_uuid
                }
            });
            return permission;
        } catch (error) {
            throw error;
        }
    }
}

export default UserPermissionsService;