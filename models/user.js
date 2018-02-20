const mongoose = require('mongoose');

//user schema

let userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    issuedBooks: mongoose.Schema.Types.ObjectId
})


let User = module.exports = mongoose.model('User', userSchema);