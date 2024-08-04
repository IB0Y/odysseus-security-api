const accessController = require('../controllers/userAccess.controller');
const { isAutheticated } = require('../middlewares/apiKey');

const routes = (app) => {
    const api = '/api/v1/access';
    app.post(`${api}/register`, accessController.register);
    app.put(`${api}/disable-Key/:id`, accessController.disableKey);
    app.put(`${api}/enable-Key/:id`, accessController.enableKey);
    app.delete(`${api}/:id`, accessController.delete);
    app.get(`${api}/api-key`,isAutheticated, accessController.getAPIKey);
    app.post(`${api}/login`, accessController.login);
}

module.exports = routes;