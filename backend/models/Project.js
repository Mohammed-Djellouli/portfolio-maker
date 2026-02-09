const mongoose = require('mongoose');
const {Schema} = mongoose;

const ProjectSchema = new Schema({
    userId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    title:{
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    imageUrl : [{
        url : {
            type : String,
            required : false
        },
        publicId : {
            type:String,
        },
    }],
    technologies : {
        type : [String],
        required : false
    },
    links: {
        github : {
            type : String,
            required : false
        },
        liveDemo : {
            type : String,
            required : false
        },
    },

    createdAt : {
        type : Date,
        default : Date.now
    }

});

module.exports = mongoose.model('Project', ProjectSchema);