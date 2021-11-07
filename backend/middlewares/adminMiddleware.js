// Import required files and packages here
import asyncHandler from "express-async-handler";

const isAdmin = asyncHandler(async (req, res, next) => {
  // console.log(req.user);
  if (req.user.isAdmin) {
    next();
  } else {
    throw new Error("Not Authorized , Token Failed!");
  }
});

export { isAdmin };
