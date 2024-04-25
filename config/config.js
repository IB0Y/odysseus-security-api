require("dotenv").config({
  path: require("find-config")(".env"),
});

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: +process.env.DB_PORT,
    logging: false,
    retry: {
      max: 10,
      min: 0.1,
      retryDelay: 10,
    },
    // logQueryParameters: true,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      supportBigNumbers: true,
    },
  },
};
