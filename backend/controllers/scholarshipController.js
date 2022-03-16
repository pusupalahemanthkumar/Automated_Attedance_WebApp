// Importing Required Files And Packages Here
import asyncHandler from "express-async-handler";

import User from "../models/userModel.js";
import Attendance from "../models/attendanceModel.js";
import Subject from "../models/subjectModel.js";

const getStudentsDetails = asyncHandler(async (req, res, next) => {
  const t = await Subject.aggregate([
    {
      $group: {
        _id: null,
        total: {
          $sum: "$classCount",
        },
      },
    },
  ]);
  const totalAttendance = t[0].total;
  const data = await Attendance.aggregate([
    {
      $group: {
        _id: "$rollNumber",
        presentCount: {
          $sum: "$isPresent",
        },
      },
    },

    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "rollNumber",
        as: "studentDetails",
      },
    },
    {
      $addFields: {
        totalAttendance: totalAttendance,
        percentage: {
          $divide: ["$presentCount", totalAttendance],
        },
      },
    },
    {
      $project: {
        studentDetails: {
          password: 0,
          subcriptionDetails: 0,
        },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  res.json(data);
});

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

export { updateStudentStatus, updateScholarshipStatus, getStudentsDetails };
