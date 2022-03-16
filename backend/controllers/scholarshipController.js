// Importing Required Files And Packages Here
import asyncHandler from "express-async-handler";

import User from "../models/userModel.js";

const updateStudentStatus = asyncHandler(async (req, res, next) => {
  const { studentStatus, rollNumber } = req.body;
  const status = await User.updateOne(
    {
      rollNumber: rollNumber,
    },
    {
      studentStatus: studentStatus,
    }
  );
  if (status) {
    res.json({
      message: "Updated Student Status!",
    });
  }
});

const updateScholarshipStatus = asyncHandler(async (req, res, next) => {
  const { scholarshipStatus, rollNumber } = req.body;
  const status = await User.updateOne(
    {
      rollNumber: rollNumber,
    },
    {
      scholarshipStatus: scholarshipStatus,
    }
  );
  if (status) {
    res.json({
      message: "Updated Student Status!",
    });
  }
});

export { updateStudentStatus, updateScholarshipStatus };
