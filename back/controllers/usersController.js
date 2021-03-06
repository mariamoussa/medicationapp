const User = require('../models/User');
const Request = require("../models/Request");
const Post = require("../models/Post");
const Report = require("../models/Report");
const bcrypt = require("bcryptjs");

class UsersController {

    isValidUsername(req, res, next) {
        let { username } = req.body;
        User.find({ username }, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        });
    }

    isValidPhone(req, res, next) {
        let { phone } = req.body;
        User.find({ phone }, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        })
    }

    isValidEmail(req, res, next) {
        let { email } = req.body;
        User.find({ email }, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        })
    }

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

    async delete(req, res, next) {
        let { id } = req.params;

        await Request.find({
            $or: [
                { senderId: id },
                { receiverId: id }
            ]
        }, (err, requests) => {
            if (err) return next(err);
            requests.map(async r => {
                await Request.deleteOne({ _id: r._id }, (err, response) => {
                    if (err) return next(err)
                });
            });
        });

        await Post.find({ _user: id }, (err, posts) => {
            if (err) return next(err);
            posts.map(async p => {
                await Post.deleteOne({ _id: p._id }, (err, response) => {
                    if (err) return next(err)
                });
            });
        });

        await Report.find({
            $or: [
                { _Reporter: id },
                { _Reported: id }
            ]
        }, (err, reports) => {
            if (err) return next(err);
            reports.map(async r => {
                await Report.deleteOne({ _id: r._id }, (err, response) => {
                    if (err) return next(err)
                });
            });
        });

        await User.deleteOne({ _id: id }, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        })
    }

}
const usersController = new UsersController();
module.exports = usersController;