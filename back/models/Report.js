const { Schema, model } = require("mongoose");

const reportSchema = new Schema({
    description: String,
    _Reporter: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    _Reported: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Report = model('Report', reportSchema);
module.exports = Report;