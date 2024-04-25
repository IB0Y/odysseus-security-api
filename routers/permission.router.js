const permissionController = require("../controllers/permission.controller");

const routes = (app) => {
  const api = "/api/v1/permissions/";
  app.post(`/`, permissionController.addPermissions);
  app.get(`/:user_uuid`, permissionController.fetchPermissionsByUserUUID);
  app.get(`/:permission_uuid`, permissionController.fetchPermissionsByUserUUID);
  app.get(
    `/:user_uuid/:resouce_id`,
    permissionController.fetchPermissionsByResourceId
  );
  app.put(`/:permission_uuid`, permissionController.updatePermissions);
  app.delete(`/:permission_uuid`, permissionController.deletePermissions);
};

module.exports = routes;
