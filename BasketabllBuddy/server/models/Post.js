const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    nickName: {
        type: String
    },
    avatar: {
        type: String
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
    photo: {
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
            nickName: {
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
    eventAttendPeople: [
        {
            user:{
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            nickName:{
                type: String
            },
            avatar: {
                type: String
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

module.exports = Posts = mongoose.model('post', PostSchema);