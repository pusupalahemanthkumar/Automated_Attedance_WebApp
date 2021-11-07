// Importing Required files and packages here
import asyncHandler from "express-async-handler";

import Attendance from "../models/attendanceModel.js";
import User from "../models/userModel.js";

const getAttendance = asyncHandler(
    async (req, res, next) => {
        const query = req.body;
        const attendanceData = await Attendance.find(query);
        res.json(attendanceData);
    }
)

const getSubjectAttendance = asyncHandler(
    async (req, res, next) => {
        const subId = req.params.subId;
        const attendanceData = await Attendance.find({ subject: subId });
        res.json({
            message: "Successfully fetched Data!",
            attendanceData: attendanceData,
        });
    }
)
const getStudentAttendance = asyncHandler(
    async (req, res, next) => {
        const studId = req.params.studId;
        const attendanceData = await Attendance.find({ rollNumber: studId });
        res.json({
            message: "Successfully fetched Data!",
            attendanceData: attendanceData,
        });
    }
)

const attendanceStarter = asyncHandler(
    async (req, res, next) => {
        const studentList = await User.find({ role: "student" }, { _id: 0, rollNumber: 1 });
        const formatYmd = date => date.toISOString().slice(0, 10);

        studentList.forEach(async (stud) => {
            await Attendance.create({
                subject: req.body.subject,
                date: formatYmd(new Date()),
                isPresent: false,
                rollNumber: stud.rollNumber
            });

        })
        res.json({
            message: "Successfully Initiated Attendance Process !",
            studentList: studentList,
        })

    }
)

const addAttendance = asyncHandler(
    async (req, res, next) => {
        const { rollNumber, subject, date, isPresent } = req.body;
        const data = await Attendance.find({ rollNumber: rollNumber, subject: subject, date: date, isPresent: isPresent });

        if (data.length == 0) {
            const attendance = await Attendance.updateOne({
                subject: subject,
                date: date,
                isPresent: false,
                rollNumber: rollNumber
            }, {
                isPresent: isPresent,
            });
            if (attendance) {
                res.json({
                    message: "Added Attendance Sucessfully!"
                });
            }
        } else {
            res.json({
                message: "Already Added Attendance Sucessfully!"
            });

        }

    }
)

export {
    addAttendance,
    getStudentAttendance,
    getSubjectAttendance,
    attendanceStarter,
    getAttendance
}