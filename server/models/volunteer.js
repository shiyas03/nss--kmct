
const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phone: { type: String, required: true },
        department: { type: String, required: true },
        isApproved: { type: Boolean, default: false }, // Admin approval required
        eventsParticipated: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Volunteer", volunteerSchema);
