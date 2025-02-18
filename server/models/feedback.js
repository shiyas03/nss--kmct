
const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
    {
        volunteer: { type: mongoose.Schema.Types.ObjectId, ref: "Volunteer" },
        event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
        message: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
