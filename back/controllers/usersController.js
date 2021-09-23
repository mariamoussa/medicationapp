const User = require('../models/User');
const bcrypt = require("bcryptjs");

class UsersController {

    getAll(req, res, next) {
        User.find({ role_id: "user" }, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        })
    }

    get(req, res, next) {
        let { id } = req.params;
        User.findById(id, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        });
    }

    async put(req, res, next) {
        let { id } = req.params;
        let body = req.body;

        if (body.password) {
            let salt = await bcrypt.genSalt(10);
            let hashedPassword = await bcrypt.hash(body['password'], salt);
            body['password'] = hashedPassword;
        }

        User.updateOne({ _id: id }, {
            $set: body
        }, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        });
    }

    delete(req, res, next) {
        let { id } = req.params;
        User.deleteOne({ _id: id }, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        })
    }

}
const usersController = new UsersController();
module.exports = usersController;