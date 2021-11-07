// Import required files and packages here
import asyncHandler from "express-async-handler";

const isFaculty = asyncHandler(async (req, res, next) => {
    if (req.user.role == "faculty") {
        next();
    } else {
        throw new Error("Not Authorized , Token Failed!");
    }
});

export { isFaculty };