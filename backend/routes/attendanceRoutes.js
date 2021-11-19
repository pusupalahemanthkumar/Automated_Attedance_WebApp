// Importing Required Files And Packages Here
import express from "express";

import { getStudentAttendance, attendanceStarterMultipleAdder, getSubjectAttendance, addAttendance, attendanceStarter, getAttendance } from "../controllers/attendanceController.js"
import { isFaculty } from "../middlewares/facultyMiddleware.js"
import { protect } from "../middlewares/authMiddleware.js"


const router = express.Router();

// @POST -/api/attendance/starter
// router.post("/starter", protect, isFaculty, attendanceStarter)

// @POST -/api/attendance/add 
router.post("/add", protect, isFaculty, addAttendance);

// @POST -/api/attendance/add-multiple
router.post("/add-multiple", protect, isFaculty, attendanceStarterMultipleAdder);

// @GET -/api/attendance/subject/:subId
// router.get("/subject/:subId", protect, isFaculty, getSubjectAttendance);

// @GET -/api/attendance/student/:studId
// router.get("/student/:studId", protect, getStudentAttendance);

// @POST -/api/attendance/get/
router.post("/get", protect, getAttendance);

export default router;