// Importing Required Files And Packages Here
import express from "express";

import {
  updateScholarshipStatus,
  updateStudentStatus,
  getStudentsDetails,
} from "../controllers/scholarshipController.js";

const router = express.Router();

// @GET -/api/scholarship/details/
router.get("/details", getStudentsDetails);

// @POST -/api/scholarship/student-status
router.post("/student-status", updateStudentStatus);

// @POST -/api/scholarship/scholarship-status
router.post("/scholarship-status", updateScholarshipStatus);

export default router;
