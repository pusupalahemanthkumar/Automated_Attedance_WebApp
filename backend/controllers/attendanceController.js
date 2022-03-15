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

const getlowAttendanceStudentDetails = asyncHandler(
    async (req, res, next) => {
        const data = await Attendance.aggregate(
            [
                { $match: { isPresent: true } },
                {
                    $group: { _id: "$rollNumber", total: { $sum: 1 } },
                },
            ]
        );

        res.json({
            data:data,
            test:test,
        });
    }

);

export {
    addAttendance,
    getAttendance,
    attendanceStarterMultipleAdder,
    deleteAttendance,
    getlowAttendanceStudentDetails
}