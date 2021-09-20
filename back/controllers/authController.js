const User = require('../models/User');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthController {

    async initialiseData(req, res, next) {
        let { _id, token } = req.body;
        if (_id && token) {
            let decoded = jwt.verify(token, "randomString", { ignoreExpiration: true });
            if (_id == decoded._id) {
                User.find({ _id, token }, (err, result) => {
                    if (err) return next(err);
                    res.json({ success: true, result: result[0] });
                });
            } else {
                res.json({ success: false })
            }
        } else {
            res.json({ success: false })
        }
    }

    async signUp(req, res, next) {
        let body = req.body;
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(body['password'], salt);
        body['password'] = hashedPassword;
        let user = new User(body);
        user.save((err, result) => {
            console.log(err);
            if (err) return next(err);
            let _id = result._id;
            let token = jwt.sign({ _id }, "randomString", { expiresIn: 10000 });
            User.updateOne({ _id }, {
                $set: { token }
            }, (err, response) => {
                if (err) return next(err);
                User.find({ _id }, (err, data) => {
                    if (err) return next(err);
                    res.json({ success: true, result: data[0] });
                });
            });
        });
    }

    async signIn(req, res, next) {
        let { username, password } = req.body;
        User.find({ username }, async (err, result) => {
            if (err) return next(err);
            let isMatch = await bcrypt.compare(password, result[0].password);
            if (isMatch) {
                let _id = result[0]._id;
                let token = jwt.sign({ _id }, "randomString", { expiresIn: 10000 });
                User.updateOne({ _id }, {
                    $set: { token }
                }, (err, response) => {
                    if (err) return next(err);
                    User.find({ _id }, (err, data) => {
                        if (err) return next(err);
                        res.json({ success: true, result: data[0] });
                    });
                });
            }
        });
    }



    async signOut(req, res, next) {
        let { _id } = req.body;
        User.updateOne({ _id }, {
            $set: { token: null }
        }, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        });
    }
}

const authController = new AuthController();
module.exports = authController;