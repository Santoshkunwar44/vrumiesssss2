const mongoose = require("mongoose")
const shopSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required"]

    },
    description: {
        type: String,
        required: [true, "description is required"]
    },
    photos: {
        type: [],
        required: [true, "photo is  required"]
    },
    quantity: {
        type: Number,
        required: [true, "quantity is required"]
    },
    price: {
        type: Number,
        required: [true, "price is required"]
    },
    shopType: {
        type: String,
        enum: ["services", "products"],
        required: [true, "shopType is required"]
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "owner is required"]
    }
}, {
    timestamps: true
})
module.exports = mongoose.model("Shop", shopSchema)