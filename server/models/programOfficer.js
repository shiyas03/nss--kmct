
const mongoose = require("mongoose");

const programOfficerSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phone: { type: String, required: true },
        role: { type: String, default: "Program Officer" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("ProgramOfficer", programOfficerSchema);
