require("dotenv").config({
  path: require("find-config")(".env"),
});

const express = require("express");
const cors = require("cors");
const consola = require("consola");
const { PermissionRoute } = require("./routers");
const databaseInstance = require("./database");

const app = express();

/**MIDDLEWARES**/
app.use(express.json());
app.use(cors());

/** ROUTING **/
const timeLog =(req, res, next) => {
  consola.info(`⏰ :: Time`,new Date( Date.now()).toLocaleString());
  next();
}

app.use(timeLog);
PermissionRoute(app);

/**SERVER**/
app.listen(process.env.SERVER_PORT, () =>
  consola.info(`Permission's server running on port ${process.env.SERVER_PORT}`)
);

(async () => {
//  consola.log({ databaseInstance });
  await databaseInstance.authenticate();
})();
