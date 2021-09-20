const { Schema, model } = require("mongoose");

const requestSchema = new Schema({
    date: Date,
    description: String,
    status: {
        type: String,
        required: true,
        default: 'Waiting'
    },
    _post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    senderId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    receiverId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Request = model('Request', requestSchema);
module.exports = Request;