const database = require('../models');
const UserPermission = database.user_permission;

/**
 * UserPermissionsService class
 * @class
 * @classdesc UserPermissionsService handles UserPermission operations
 * @static
 */
class UserPermissionsService {
 
    async addPermission({user_uuid, permission_uuid}) {
        console.log(user_uuid, permission_uuid);
        
        try {
            const permission = await UserPermission.create({user_uuid, permission_uuid});
            return permission;
        } catch (error) {
            throw error;
        }
    }

    // Fetch permissions by user_uuid
    
    async getPermissions({user_uuid}) {
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

    async deletePermission({permission_uuid}) {
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

    async updatePermission({permission_uuid, user_uuid}) {
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

module.exports = new UserPermissionsService();