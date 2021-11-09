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

const attendanceStarterMultipleAdder = asyncHandler(
    async (req, res, next) => {
        const { date, subject, rollNumbers } = req.body;

        const studentList = await User.find({ role: "student" }, { _id: 0, rollNumber: 1 });
        const queryInsertion = [];
        for (let i = 0; i < studentList.length; i++) {
            queryInsertion.push({
                rollNumber: studentList[i].rollNumber,
                subject: subject,
                date: date,
                isPresent: false,
            })
        }
        await Attendance.insertMany(queryInsertion);
        await Attendance.updateMany({ date: date, subject: subject, isPresent: false, rollNumber: { $in: rollNumbers } }, { isPresent: true })

        // for (let i = 0; i < rollNumbers.length; i++) {
        //     const updateId = await Attendance.updateOne({ rollNumber: rollNumbers[i], date: date, subject: subject, isPresent: false }, { isPresent: true });
        //     console.log(updateId);
        // }
        res.json({
            message: "Updated Sucessfully !"
        })
    }
);
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
    getAttendance,
    attendanceStarterMultipleAdder
}