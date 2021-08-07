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
    doubtImg: {
        type: String,
        default: 'https://res.cloudinary.com/modimanju/image/upload/v1628310541/tmorfu79yjlaiqdtc0mu.jpg'
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
