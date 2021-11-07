// Importing required files and packages here
import asyncHandler from "express-async-handler";

import User from "../models/userModel.js";
import generateToken from "../utils/generateTokens.js";


// Authenciate User
const authUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        if (user.role == "faculty") {
            res.json({
                _id: user._id,
                name: user.name,

                email: user.email,
                role: user.role,
                subject: user.subject,
                department: user.department,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            })
        } else {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                rollNumber: user.rollNumber,
                year: user.year,
                course: user.course,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });

        }

    } else {
        res.status(401);
        throw new Error("Invaild email or password.");
    }
});

// Registration
const registerUser = asyncHandler(async (req, res, next) => {
    const email = req.body.email
    const userExits = await User.findOne({ email: email });

    if (userExits) {
        res.status(400);
        throw new Error("User already exists!");
    }
    const user = await User.create(req.body);
    if (user) {
        res.status(200);
        if (user.role == "faculty") {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                subject: user.subject,
                department: user.department,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            })
        } else {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                rollNumber: user.rollNumber,
                year: user.year,
                course: user.course,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });

        }
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

export { authUser, registerUser };


