const Post = require("../models/Post");
const Request = require("../models/Request");
const fs = require('fs');

class PostsController {

    getAll(req, res, next) {
        let { isPost, _user } = req.body;

        (isPost != undefined && _user != undefined) ?
            Post
                .find({ isPost, _user })
                .populate('_user')
                .exec((err, response) => {
                    if (err) return next(err);  ``
                    res.status(200).send(response);
                })
            :
            (isPost != undefined) ?
                Post
                    .find({ isPost })
                    .populate('_user')
                    .exec((err, response) => {
                        if (err) return next(err);
                        res.status(200).send(response);
                    })
                :
                Post.find({}).populate('_user').exec((err, response) => {
                    if (err) return next(err);
                    res.status(200).send(response);
                });
    }

    get(req, res, next) {
        let { id } = req.params;
        Post.findById(id, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        })
    }

    post(req, res, next) {
        let body = req.body;
        // body['image'] = req.file && req.file.filename;
        // console.log(body.image);
        let user = new Post(body);
        user.save((err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        })
    }

    put(req, res, next) {
        let { id } = req.params;
        let body = req.body;
        console.log({ id, body });
        Post.updateOne({ _id: id }, {
            $set: body
        }, (err, response) => {
            if (err) return next(err)
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

        await Post.deleteOne({ _id: id }, (err, response) => {
            if (err) return next(err)
            res.status(200).send(response);
        });
    }
}

const postsController = new PostsController();
module.exports = postsController;