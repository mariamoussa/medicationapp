const Request = require("../models/Request");

class RequestsController {

    getAll(req, res, next) {
        Request.find({}, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        })
    }

    get(req, res, next) {
        let { id } = req.params;
        Request.findById(id, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        })
    }

    post(req, res, next) {
        let body = req.body;
        let user = new Request(body);
        user.save((err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        })
    }

    put(req, res, next) {
        let { id } = req.params;
        let body = req.body;
        Request.updateOne({ _id: id }, {
            $set: body
        }, (err, response) => {
            if (err) return next(err)
            res.status(200).send(response);
        });
    }

    delete(req, res, next) {
        let { id } = req.params;
        Request.deleteOne({ _id: id }, (err, response) => {
            if (err) return next(err)
            res.status(200).send(response);
        });
    }
}

const requestsController = new RequestsController();
module.exports = requestsController;