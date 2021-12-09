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

const attendanceStarterMultipleAdder = asyncHandler(
    async (req, res, next) => {
        const { date, subject, rollNumbers, hour } = req.body;

        const studentList = await User.find({ role: "student" }, { _id: 0, rollNumber: 1 });
        const queryInsertion = [];
        for (let i = 0; i < studentList.length; i++) {
            queryInsertion.push({
                rollNumber: studentList[i].rollNumber,
                subject: subject,
                date: date,
                hour: hour,
                isPresent: false,
            })
        }
        await Attendance.insertMany(queryInsertion);
        await Attendance.updateMany({ date: date, hour: hour, subject: subject, isPresent: false, rollNumber: { $in: rollNumbers } }, { isPresent: true })

        res.json({
            message: "Updated Sucessfully !"
        })
    }
);
const addAttendance = asyncHandler(
    async (req, res, next) => {
        const { rollNumber, subject, date, isPresent, hour } = req.body;
        const attendance = await Attendance.updateOne({
            subject: subject,
            date: date,
            isPresent: isPresent,
            hour: hour,
            rollNumber: rollNumber
        }, {
            isPresent: true,
        });
        if (attendance) {
            res.json({
                message: "Added Attendance Sucessfully!"
            });
        }


    }
)

const deleteAttendance = asyncHandler(
    async (req, res, next) => {
        const { rollNumber, subject, date, isPresent, hour } = req.body;
        console.log(req.body);
        const attendance = await Attendance.updateOne({
            subject: subject,
            date: date,
            isPresent: isPresent,
            hour: hour,
            rollNumber: rollNumber
        }, {
            isPresent: false,
        });
        if (attendance) {
            res.json({
                message: "deleted Attendance Sucessfully!"
            });
        }
    }
)

// Can be Removed
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

export {
    addAttendance,
    getStudentAttendance,
    getSubjectAttendance,
    attendanceStarter,
    getAttendance,
    attendanceStarterMultipleAdder,
    deleteAttendance
}