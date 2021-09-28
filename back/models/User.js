const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    role_id: {
        type: String,
        default: "user"
    },
    username: {
        type: String,
        unique: true,
        trim: true,
        maxLength: 50,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    firstName: String,
    lastName: String,
    birthdate: String,
    address: String,
    gender: String,
    token: {
        type: String,
        default: null
    }
}, {
    collection: 'users'
});

const User = model('User', userSchema);
module.exports = User;