// Importing Required Files And Packages Here
import express from "express";

import {
    addAttendance,
    getAttendance,
    attendanceStarterMultipleAdder,
    deleteAttendance,
    getlowAttendanceStudentDetails,
    getAllStudentAttendanceDetails
} from "../controllers/attendanceController.js"
import { isFaculty } from "../middlewares/facultyMiddleware.js"
import { protect } from "../middlewares/authMiddleware.js"


const router = express.Router();

// @POST -/api/attendance/add 
router.post("/add", protect, isFaculty, addAttendance);

// @POST -/api/attendance/add-multiple
router.post("/add-multiple", protect, isFaculty, attendanceStarterMultipleAdder);


// @POST -/api/attendance/delete
router.post("/delete", protect, isFaculty, deleteAttendance);

// @POST -/api/attendance/get/
router.post("/get", protect, getAttendance);

// @GET -/api/attendance/low/
router.get("/low",getlowAttendanceStudentDetails);

// @GET -/api/attendance/all/
router.get("/all",getAllStudentAttendanceDetails);

export default router;