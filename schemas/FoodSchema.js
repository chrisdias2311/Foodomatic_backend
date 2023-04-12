const mongoose = require("mongoose");

const foodSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
    },
    image: {
        type: String,
    },
    location: {
        type: String,
    },
    preparingtime: {
        type: Number,
    },
    rating: {
        type: Number,
    }
});


// userSchema.plugin(passportLocalMongoose);
// userSchema.plugin(findOrCreate);

module.exports = mongoose.model('Food', foodSchema);