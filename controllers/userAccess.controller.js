const ResponseService = require("../utils/responses");
const consola = require("consola");
const database = require("../models");
const { generateToken } = require("../utils/token");

const UserAccessModel = database.user_access;

class UserAccess {
    async register(req, res) {
        try {
            const { user_email, password } = req.body;
            let user = await UserAccessModel.create({
                user_email,
                password
            });

            if (!user) {
                return ResponseService.error({
                    res,
                    status: 400,
                    message: "User registration failed"
                });
            }

            user.access_token = generateToken({
                user_email,
                password,
                user_id: user?.id
            });

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

}

module.exports = new UserAccess();
