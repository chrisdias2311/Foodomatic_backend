const mongoose = require("mongoose");

const DeliveryBoySchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
});


module.exports = mongoose.model('DeliveryBoy', DeliveryBoySchema);