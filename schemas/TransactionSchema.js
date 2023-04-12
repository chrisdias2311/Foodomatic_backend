const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema({
    foodId: {
        type: String,
        required: true
    },
    foodName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
    },
    restaurantLocation: {
        type: String,
    },
    userId:{
        type: String,
    },
    userName: {
        type: String,
    },
    userPhone: {
        type: String,
    },
    userLocation: {
        type: String,
    },
    distance: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    liveLocation: {
        type: String
    },
    status:{
        type: String,
    }
});


module.exports = mongoose.model('Transaction', TransactionSchema);