// Importing Required Files And Packages Here
import express from "express";

import { getStudentAttendance,attendanceStarterMultipleAdder, getSubjectAttendance, addAttendance,attendanceStarter,getAttendance } from "../controllers/attendanceController.js"
import { isFaculty } from "../middlewares/facultyMiddleware.js"
import {protect} from "../middlewares/authMiddleware.js"


const router = express.Router();

// @POST -/api/attendance/starter
router.post("/starter",attendanceStarter)

// @POST -/api/attendance/add 
router.post("/add", addAttendance);
router.post("/add-multiple",attendanceStarterMultipleAdder );

// @GET -/api/attendance/subject/:subId
// router.get("/subject/:subId", isFaculty, getSubjectAttendance);
router.get("/subject/:subId", getSubjectAttendance);

// @GET -/api/attendance/student/:studId
router.get("/student/:studId", getStudentAttendance);

// @POST -/api/attendance/get/
router.post("/get",protect,getAttendance);

export default router;