const mongoose = require('mongoose');

const ContentItemModel = mongoose.Schema({
    title: {
        type: String,
        required: true,
        max: [60, "Title  exceeded the maximum length of 60 characters"]
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,

    },
    description: {
        type: String,
        required: true,
        max: [360, "Desscription  exceeded the maximum length of 360 characters"]
    },
    contentType: {
        type: String,
        required: true,
        enum: {
            values: ['blog', 'vlog', 'forum'],
            message: '{VALUE} is not a valid'
        }
    },
    likes: [],
    dislikes: [],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            text: String,
        }
    ],
    thumbnail_image: String,
    video_url: String,
    photos: Array,
    website_url: String,
}, {
    timestamps: true
})

module.exports = mongoose.model("Content", ContentItemModel)
