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
    answerdBy: {
        type: String,
    },
    status: {
        type: String,
        default: "pending",
    }
});

const Doubt = mongoose.model("DOUBT", doubtSchema);

module.exports = Doubt;
