const Report = require("../models/Report");

class ReportsController {

    getAll(req, res, next) {
        Report.find({}, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        })
    }

    getByUser(req, res, next) {
        let { _Reported } = req.body;
        Report.find({ _Reported }, (err, response) => {
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

}

const reportsController = new ReportsController();
module.exports = reportsController;