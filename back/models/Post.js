const { Schema, model } = require("mongoose");

const postSchema = new Schema({
    description: String,
    date: Date,
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    isPost: {
        type: Boolean,
        required: true
    },
    medicationName: {
        type: String,
        required: true
    },
    image: String,
    quantity: {
        type: Number,
        required: true
    },
    medicationType: String,
    _user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    collection: "posts"
});

const Post = model('Post', postSchema);
module.exports = Post;

