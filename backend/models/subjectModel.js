// Importing Required Files And Packages Here
import mongoose from "mongoose";

const subjectSchema = mongoose.Schema({
    subjectName: {
        type: String,
        required: true,
        unique: true,
    },
    classCount: {
        type: Number,
        default: 0,
    },

}, {
    timestamps: true
})

const Subject = mongoose.model("Subject", subjectSchema);

export default Subject;