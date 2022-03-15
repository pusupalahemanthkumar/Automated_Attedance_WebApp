// Importing Required files and packages here
import asyncHandler from "express-async-handler";

import Attendance from "../models/attendanceModel.js";
import User from "../models/userModel.js";
import Subject from "../models/subjectModel.js";

const MIN_ATTENDANCE_CONSTRAINT = 0.75;

const getAttendance = asyncHandler(async (req, res, next) => {
  const query = req.body;
  const attendanceData = await Attendance.find(query).sort({ date: -1 });
  res.json(attendanceData);
});

const attendanceStarterMultipleAdder = asyncHandler(async (req, res, next) => {
  const { date, subject, rollNumbers, hour } = req.body;

  await Subject.updateOne(
    { subjectName: subject },
    { $inc: { classCount: 1 } }
  );

  const studentList = await User.find(
    { role: "student" },
    { _id: 0, rollNumber: 1 }
  );
  const queryInsertion = [];
  for (let i = 0; i < studentList.length; i++) {
    queryInsertion.push({
      rollNumber: studentList[i].rollNumber,
      subject: subject,
      date: date,
      hour: hour,
      isPresent: 0,
    });
  }
  await Attendance.insertMany(queryInsertion);
  await Attendance.updateMany(
    {
      date: date,
      hour: hour,
      subject: subject,
      isPresent: 0,
      rollNumber: { $in: rollNumbers },
    },
    { isPresent: 1 }
  );

  res.json({
    message: "Updated Sucessfully !",
  });
});
const addAttendance = asyncHandler(async (req, res, next) => {
  const { rollNumber, subject, date, isPresent, hour } = req.body;
  const attendance = await Attendance.updateOne(
    {
      subject: subject,
      date: date,
      isPresent: isPresent,
      hour: hour,
      rollNumber: rollNumber,
    },
    {
      isPresent: 1,
    }
  );
  if (attendance) {
    res.json({
      message: "Added Attendance Sucessfully!",
    });
  }
});

const deleteAttendance = asyncHandler(async (req, res, next) => {
  const { rollNumber, subject, date, isPresent, hour } = req.body;
  console.log(req.body);
  const attendance = await Attendance.updateOne(
    {
      subject: subject,
      date: date,
      isPresent: isPresent,
      hour: hour,
      rollNumber: rollNumber,
    },
    {
      isPresent: 0,
    }
  );
  if (attendance) {
    res.json({
      message: "deleted Attendance Sucessfully!",
    });
  }
});

const getAllStudentAttendanceDetails = asyncHandler(async (req, res, next) => {
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
  console.log(t);
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
  ]);
  console.log(data.length);
  res.json(data);
});

const getlowAttendanceStudentDetails = asyncHandler(async (req, res, next) => {
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
  console.log(t);
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
    { $match: { percentage: { $lte: MIN_ATTENDANCE_CONSTRAINT } } },
    {
      $project: {
        studentDetails: {
          password: 0,
          subcriptionDetails: 0,
        },
      },
    },
  ]);
  console.log(data.length);
  res.json(data);
});

export {
  addAttendance,
  getAttendance,
  attendanceStarterMultipleAdder,
  deleteAttendance,
  getlowAttendanceStudentDetails,
  getAllStudentAttendanceDetails
};
