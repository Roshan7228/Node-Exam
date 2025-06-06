const mongoose = require("mongoose");


let Postschema = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});



let postmodel = mongoose.model("post", Postschema);

module.exports = postmodel;