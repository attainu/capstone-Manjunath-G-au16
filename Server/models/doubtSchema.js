const mongoose = require("mongoose");

const doubtSchema = new mongoose.Schema({
    askedBy: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
    },
    answeredBy: {
        type: String,
    },
    status: {
        type: String,
        default: "pending",
    }
});

const Doubt = mongoose.model("DOUBT", doubtSchema);

module.exports = Doubt;
