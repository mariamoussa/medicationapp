const Post = require("../models/Post");

class PostsController {

    getAll(req, res, next) {
        let body = req.body
        let { isPost, _user } = req.body;
        
        (isPost != undefined || _user != undefined) ?
            Post.find({ ...body }).populate('_user').exec((err, response) => {
                if (err) return next(err);
                res.status(200).send(response);
            }) :
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

    delete(req, res, next) {
        let { id } = req.params;
        Post.deleteOne({ _id: id }, (err, response) => {
            if (err) return next(err)
            res.status(200).send(response);
        });
    }
}

const postsController = new PostsController();
module.exports = postsController;