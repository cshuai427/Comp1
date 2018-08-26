const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    eventTitle: {
        type: String,
        required: true
    },
    eventText: {
        type: String,
        required: true
    },
    eventPeopleNumber: {
        type: Number,
        required: true
    },
    eventLocation: {
        type: String,
        required: true
    },
    haveBall: {
        type: Boolean,
        default: false
    },
    eventDate: {
        type: Date,
        required: true
    },
    eventOverStatus: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String
    },
    likes: [
        {
            user:{
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            text: {
                type: String,
                required: true
            },
            title: {
                type: String
            },
            avatar: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    createDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = Post = mongoose.model('post', PostSchema);