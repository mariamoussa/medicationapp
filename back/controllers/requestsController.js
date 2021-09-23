const Request = require("../models/Request");
const Post = require("../models/Post");
const mongoose = require('mongoose');

class RequestsController {

    getAll(req, res, next) {
        Request.find({}).populate('_post').populate('senderId').populate('receiverId').exec((err, response) => {
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

    getBySenderId(req, res, next) {
        let { userId } = req.params;
        Request
            .find({ senderId: mongoose.Types.ObjectId(userId) })
            .populate('receiverId')
            .populate('_post')
            .exec((err, response) => {
                if (err) return next(err);
                res.status(200).send(response);
            })
    }

    getByReceiverId(req, res, next) {
        let { userId } = req.params;
        Request
            .find({ receiverId: mongoose.Types.ObjectId(userId) })
            .populate('senderId')
            .populate('_post')
            .exec((err, response) => {
                if (err) return next(err);
                res.status(200).send(response);
            })
    }

    async post(req, res, next) {

        let body = req.body;
        let { _user: senderId, _post: postId } = body;
        let { _user: receiverId } = await Post.findById(postId);

        let request = new Request({
            _post: postId,
            senderId,
            receiverId
        });

        request.save((err, response) => {
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