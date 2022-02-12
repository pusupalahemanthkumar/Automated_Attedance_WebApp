// Importing Required Files And Packages Here
import mongoose from "mongoose";

const attendanceSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    rollNumber: {
        type: String,
        required: true,
        ref: 'User'
    },
    isPresent: {
        type: Number,
        default: 0,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    hour: {
        type: String,
    }


}, {
    timestamps: true,
});

const Attendance = mongoose.model("attendance", attendanceSchema);
export default Attendance;
