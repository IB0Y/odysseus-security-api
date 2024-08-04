const ResponseService = require("../utils/responses");
const consola = require("consola");
const database = require("../models");
const { generateToken } = require("../utils/token");
const { hashPassword } = require("../utils/hashPassword");
const bcrypt = require('bcrypt');
const { randGenerate } = require("../utils/randGenerate");

const UserAccessModel = database.user_access;

class UserAccess {
    async register(req, res) {
        try {
            const { user_email, password } = req.body;
            const _password = password ? await hashPassword({ password }) : ""
    

            let user = await UserAccessModel.create({
                user_email,
                password: _password
            });

            if (!user) {
                return ResponseService.error({
                    res,
                    status: 400,
                    message: "User registration failed"
                });
            }

            user.api_key = randGenerate();
            

            await user.save();

            return ResponseService.success({
                res,
                status: 201,
                message: "User registered successfully",
                data: user
            });
        } catch (error) {
            consola.log(error);
            return ResponseService.serverError({ res });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            let user = await UserAccessModel.findByPk(id);

            if (!user) {
                return ResponseService.error({
                    res,
                    status: 404,
                    message: "User not found"
                });
            }

            await user.destroy();

            return ResponseService.success({
                res,
                status: 200,
                message: "User deleted successfully"
            });
        } catch (error) {
            consola.log(error);
            return ResponseService.serverError({ res });
        }
    }

    async disableKey(req, res) {
        try {
            const { id } = req.params;
            let user = await UserAccessModel.findByPk(id);

            if (!user) {
                return ResponseService.error({
                    res,
                    status: 404,
                    message: "User not found"
                });
            }

            user.is_active = false;
            await user.save();

            return ResponseService.success({
                res,
                status: 200,
                message: "User key disabled successfully"
            });
        } catch (error) {
            consola.log(error);
            return ResponseService.serverError({ res });
        }
    }


    async enableKey(req, res) {
        try {
            const { id } = req.params;
            let user = await UserAccessModel.findByPk(id);

            if (!user) {
                return ResponseService.error({
                    res,
                    status: 404,
                    message: "User not found"
                });
            }

            user.is_active = true;
            await user.save();

            return ResponseService.success({
                res,
                status: 200,
                message: "User key enabled successfully"
            });
        } catch (error) {
            consola.log(error);
            return ResponseService.serverError({ res });
        }
    }

    async login(req, res) {
        try {
            const { user_email, password } = req.body;
            const user = await UserAccessModel.findOne({
                where: {
                    user_email
                }
            });

            if (!user) {
                return ResponseService.error({
                    res,
                    status: 404,
                    message: "User not found"
                });
            }

            if (!user.is_active) {
                return ResponseService.error({
                    res,
                    status: 403,
                    message: "User key is disabled"
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return ResponseService.error({
                    res,
                    status: 401,
                    message: "Invalid credentials"
                });
            }

            // Remove password from user object
            delete user.dataValues.password;

            return ResponseService.success({
                res,
                status: 200,
                message: "User logged in successfully",
                data: {
                    user,
                    authToken: generateToken({
                        user_email,
                        user_id: user?.id
                    })
                }
            });
        } catch (error) {
            consola.log(error);
            return ResponseService.serverError({ res });
        }
    }

    async getAPIKey(req, res) {
        try {
            const { user_email } = res.locals.user;

            const user = await UserAccessModel.findOne({
                where: {
                    user_email
                }
            });

            if (!user) {
                return ResponseService.error({
                    res,
                    status: 404,
                    message: "User not found"
                });
            }

            if (!user.is_active) {
                return ResponseService.error({
                    res,
                    status: 403,
                    message: "User key is disabled"
                });
            }

            return ResponseService.success({
                res,
                status: 200,
                message: "User key retrieved successfully",
                data: {api_key: user.api_key}
            });
        } catch (error) {
            consola.log(error);
            return ResponseService.serverError({ res });
        }
    }

}

module.exports = new UserAccess();
