const Post = require("../models/Post");

class PostsController {

    getAll(req, res, next) {
        Post.find({}, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        })
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
        let user = new Post(body);
        user.save((err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        })
    }

    put(req, res, next) {
        let { id } = res.params;
        let body = req.body;
        Post.updateOne({ _id: id }, {
            $set: body
        }, (err, response) => {
            if (err) return next(err)
            res.status(200).send(response);
        });
    }

    delete(req, res, next) {
        let { id } = res.params;
        Post.deleteOne({ _id: id }, (err, response) => {
            if (err) return next(err)
            res.status(200).send(response);
        });
    }
}

const postsController = new PostsController();
module.exports = postsController;