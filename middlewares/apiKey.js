const ResponseService = require('../utils/responses');

const database = require('../models');
const UserAccessModel = database.user_access;

const isAutheticated = async (req, res, next) => {
    const apiKey = req.headers['api-key'];

    if (!apiKey) {
        return ResponseService.unauthorized({ res });
    }

    const user = await UserAccessModel.findOne({
        where: {
            api_key: apiKey
        }
    });

    if (!user) {
        return ResponseService.unauthorized({ res });
    }


    res.locals.user = user;

    if (user?.is_active) {
        next();
    } else {
        return ResponseService.unauthorized({ res });
    }
}

module.exports = {isAutheticated};