const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        // required: true
    },
    lastname: {
        type: String,
        // required: true,
    },
    location:{
        type: String,
    },
    password: {
        type: String,
        // required: true
    },
    verified:{
        type: String,

    },
});


// userSchema.plugin(passportLocalMongoose);
// userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);