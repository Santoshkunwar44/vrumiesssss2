const mongoose = require('mongoose');

const transactionModel = mongoose.Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    price: Number,
    sellersFeedback: {
        response: {
            type: String,
            default: "in progress"
        },
        rating: Number
    },
    buyersFeedback: {
        response: {
            type: String,
            default: "in progress"
        },
        rating: Number

    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Transaction", transactionModel)



