require("dotenv").config({
    path: require("find-config")(".env"),
});
const { Sequelize } = require('sequelize');
const consola = require("consola");


// Test the connection
const databaseInstance = {

    authenticate:async  () => {
        // Create a Sequelize instance
        const sequelize = new Sequelize(
            `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
);

        try {
            await sequelize.authenticate();
            consola.ready('Connection to the database has been established successfully.');

        } catch (error) {
            consola.error('Unable to connect to the database:', error);
        }
    }
}

module.exports = databaseInstance;
