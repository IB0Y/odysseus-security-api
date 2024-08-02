const UserPermissions = require("../controllers/userPermissions.controller");

const api = "/api/v1/users";
const routes = (app) =>   {
   
    app.post(`${api}/`, UserPermissions.addPermission);
    app.get(`${api}/:user_uuid`, UserPermissions.getPermissions);
    app.put(`${api}/:permission_uuid`, UserPermissions.updatePermission);
    app.delete(`${api}/:permission_uuid`, UserPermissions.deletePermission);
}

module.exports = routes;