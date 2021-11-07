// Importing Required Files And Packaes Here
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import cors from "cors"

import connectDB from "./config/db.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors())

app.use("/api/users/", userRoutes);
app.use("/api/attendance/", attendanceRoutes);
app.get("/", (req, res) => {
    res.send(`<h1>Automated Attendance System Backend</h1>`)
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.yellow.bold);
});

