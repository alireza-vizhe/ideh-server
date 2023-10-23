const mongoose = require("mongoose");

const Post = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        require: true
    },
    status: {
        type: String,
        required: true  
    },
    link: {
        type: String,
        required: true
    },
    img: {
        data: Buffer,
        contentType: String,
    },
    singleShow: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model("Post", Post);