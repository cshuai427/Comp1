const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema

const UsersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    accountCreateDate:{
        type: Date,
        default: Date.now
    },
    friendList: [
        {
            user:{
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            name: {
                type: String
            },
            avatar: {
                type: String
            }
        }
    ]
});

module.exports = User = mongoose.model('users', UsersSchema);
