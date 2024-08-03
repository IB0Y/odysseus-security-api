require("dotenv").config({
  path: require("find-config")(".env"),
});

const express = require("express");
const cors = require("cors");
const consola = require("consola");
const { PermissionRoute, UserPermissionRoute } = require("./routers");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const databaseInstance = require("./database");

const app = express();

/**MIDDLEWARES**/
app.use(express.json());
app.use(cors());
// Serve Swagger documentation
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

/** ROUTING **/
const timeLog =(req, res, next) => {
  consola.info(`⏰ :: Time`,new Date( Date.now()).toLocaleString());
  next();
}

app.use(timeLog);

/**ROUTES**/
PermissionRoute(app);
UserPermissionRoute(app);

/**SERVER**/
app.listen(process.env.SERVER_PORT, () =>
  consola.info(`Permission's server running on port ${process.env.SERVER_PORT}`)
);

(async () => {
//  consola.log({ databaseInstance });
  await databaseInstance.authenticate();
})();
