// Importing Required Files And Packages Here
import mongoose from "mongoose";

const attendanceSchema = mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    rollNumber: {
        type: String,
        required: true,
    },
    isPresent: {
        type: Boolean,
        default: false,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    }


}, {
    timestamps: true,
});

const Attendance = mongoose.model("attendance", attendanceSchema);
export default Attendance;
