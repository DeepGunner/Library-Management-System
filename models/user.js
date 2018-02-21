const mongoose = require('mongoose');

//user schema

let userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
    },
    issuedBooks: mongoose.Schema.Types.ObjectId
})


let User = module.exports = mongoose.model('User', userSchema);