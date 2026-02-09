const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    bio : {
        type : String,
        required : false
    },
});

module.exports = mongoose.model('User', UserSchema);