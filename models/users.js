const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    task: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },


})


const User = mongoose.model("User", userSchema);

module.exports = User;