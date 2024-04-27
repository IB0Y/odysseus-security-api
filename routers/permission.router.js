const permissionController = require("../controllers/permission.controller");

const routes = (app) => {
 const api = "/api/v1/permissions";
 app.post(`${api}/`, permissionController.addPermissions);
  app.get(`${api}/:user_uuid`, permissionController.fetchPermissionsByUserUUID);
  app.get(`${api}/permission/:permission_uuid`, permissionController.fetchPermissionsByUUID);
  app.get(
    `${api}/:user_uuid/:resouce_id`,
    permissionController.fetchPermissionsByResourceId
  );
  app.put(`${api}/:permission_uuid`, permissionController.updatePermissions);
  app.delete(`${api}/:permission_uuid`, permissionController.deletePermissions);
};

module.exports = routes;
