const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    nickName:{
        type: String,
        required: true
    },
    interests: {
        type: [String]
    },
    playerRole: {
        type: String
    },
    aboutMe: {
        type: String

    },
    social:
        {
            youtube: {
                type: String
            },
            twitter: {
                type: String
            },
            facebook: {
                type: String
            },
            linkedin: {
                type: String
            },
            instargram: {
                type: String
            }

        },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = Profile = mongoose.model('profile', ProfileSchema);