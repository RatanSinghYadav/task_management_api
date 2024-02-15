const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true,
        default: null
    },
    lname: {
        type: String,
        trim: true,
        default: null
    },
    currentLocation: {
        type: String,
        trim: true,
        default: null
    },
    email: {
        type: String,
        required: true,
        trim: true,
        default: null
    },
    number: {
        type: String,
        // unique: true,
        default: null,
    },
    password: {
        type: String,
        required: true,
        default: null,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    avatar: {
        type: String,
        default: null
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tasks',
    }]
},
    {
        timestamps: true
    }
)

const users = new mongoose.model("users", userSchema);

module.exports = users;