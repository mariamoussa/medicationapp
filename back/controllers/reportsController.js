const Report = require("../models/Report");
const User = require("../models/User");

class ReportsController {

    getAll(req, res, next) {
        Report.find({}).populate('_Reporter').populate('_Reported').exec((err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        })
    }

    getByUser(req, res, next) {
        let { _Reported } = req.body;
        Report.find({ _Reported }).populate('_Reporter', 'username').populate('_Reported', 'username').exec((err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        })
    }

    post(req, res, next) {
        let body = req.body;
        let user = new Report(body);
        user.save((err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        })
    }


    getReportsCount(req, res, next) {
        let arr = [];
        let count = 1;
        User.find({ role_id: "user" }, ["username"], (err, response) => {
            if (err) return next(err);
            response.map(respo => {
                Report.find({ _Reported: respo._id }, (err, data) => {
                    let sum = 0;
                    if (data.length) {
                        sum = data.length;
                        arr.push({ ...respo._doc, count: sum });
                    }
                    if (count == response.length) {
                        console.log("jnfhb");
                        res.status(200).send(arr);
                    } else {
                        count++;
                    }
                });
            });

        })
    }

    delete(req, res, next) {
        let { maria } = req.params;
        Report.deleteOne({ _id: maria }, (err, response) => {
            if (err) return next(err)
            res.status(200).send(response);
        });
    }

}

const reportsController = new ReportsController();
module.exports = reportsController;