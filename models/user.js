const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

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

// userSchema.methods.generateHash = function(password){
// 	return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
// }

// userSchema.methods.validPassword = function(password){
// 	return bcrypt.compareSync(password, this.password);
// }

let User = module.exports = mongoose.model('User', userSchema);