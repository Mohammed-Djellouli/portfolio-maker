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
    title : {
        type : String,
        required : false,
        default: 'Developer'
    },
    profileImage : {
        type : String,
        required : false
    },
    github : {
        type : String,
        required : false
    },
    linkedin : {
        type : String,
        required : false
    },
    twitter : {
        type : String,
        required : false
    },
    skills : [{
        name : String,
        abbreviation : String
    }],
    methodologies : [{
        name : String,
        icon : String
    }],
    experiences : [{
        title : String,
        company : String,
        period : String,
        description : String
    }],
    education : [{
        degree : String,
        institution : String,
        year : String,
        description : String
    }]
});

module.exports = mongoose.model('User', UserSchema);