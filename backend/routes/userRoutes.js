// Importing Required Files And Packages Here
import express from "express";
import { authUser, registerUser } from "../controllers/userController.js"

const router = express.Router();

// @POST -/api/users/login  (LOGIN END POINT)
router.post("/login", authUser)

// @POST -/api/Users/register (REISTER END POINT)
router.post("/register", registerUser)


export default router;