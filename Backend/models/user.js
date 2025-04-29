const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    image: {
        type: String
    }
}, {timestamps: true});

const User = mongoose.model("user", userSchema);
module.exports = User;