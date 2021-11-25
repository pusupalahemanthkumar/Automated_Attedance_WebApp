import React, { useEffect, useState } from 'react';
import * as faceapi from '@vladmandic/face-api';
import axios from "axios";
import { useSelector } from "react-redux";

import Navbar from '../components/Navbar/Navbar';
import Footer from "../components/Footer/Footer"
import Spinner from "../components/Spinner/Spinner"
import { loadLabeledImages, loadFaceApiModels, faceRecogintionOutput } from "../utils/FaceApiUtils"

const formatYmd = date => date.toISOString().slice(0, 10);

const TakeAttendancePage = ({history}) => {
    let rollNumbers = [];
    const [recognitionOutput, setRecognitionOutput] = useState([]);
    const [status, setStatus] = useState("Initial");
    const [subject, setSubject] = useState("");
    const [hour, sethour] = useState("");
    const [added,setAdded]=useState(false);



    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if(userInfo && userInfo.role!=="faculty"){
            history.replace("/");
        }
        if (userInfo) {
            setSubject(userInfo.subject);
        }
        loadFaceApiModels();
    }, [])

    const studentImageChangeHandler = async (e) => {
        setStatus("Processing");
        console.log("--------Started Face Recognition Process !----------");
        const labeledFaceDescriptors = await loadLabeledImages()
        const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
        console.log("----------Trained Model Loaded------------");

        rollNumbers = await faceRecogintionOutput(e.target.files, faceMatcher)
        await setRecognitionOutput(rollNumbers);
        setStatus("Fetched");
    }
    const addAttendanceHandler = async (e) => {
        e.preventDefault();
        const query = {
            subject: subject,
            rollNumbers: [...new Set(recognitionOutput)],
            date: formatYmd(new Date()),
            hour:hour,
        }
        const config = {
            headers: {
              "Content-Type": "application/json",
              "authorization":`Bearer ${userInfo.token}`
            },
          };
        console.log(query)
        const { data } = await axios.post(
            "http://localhost:5000/api/attendance/add-multiple",
            query,
            config
        );
        setAdded(true);
        console.log(data);
    }
    let UI;
    if (status === "Initial") {
        UI = (
            <>
                <div className="message">
                    <p >Please Take And Upload Image</p>
                </div>
            </>
        )


    } else if (status === "Processing") {
        UI = <Spinner />
    }
    else {
        UI = (
            <form className="login-register-form" onSubmit={addAttendanceHandler}>
                <div className="form-group">
                    <label for="Subject">Subject</label>
                    <input type="text" name="name" onChange={(e)=>setSubject(e.target.value)} value={subject} required placeholder="enter subject (like DS/IS/MS/IOT)" />
                </div>
                <div className="form-group">
                    <label for="course">Course</label>
                    <input type="text" name="course" required placeholder="enter course (like CSE/ECE)" />
                </div>
                <div className="form-group">
                    <label for="year">Year</label>
                    <input type="number" name="year" required placeholder="enter b.tech year (like 1/2/3/4)" min="1" max="4" />
                </div>
                <div className="form-group">
                    <label for="hour">Hour</label>
                    <input type="number" name="hour" onChange={(e)=>sethour(e.target.value)} required placeholder="enter hour (like 1/2/3/4/..)" />
                </div>
                <div className="form-group">
                    <label for="rollNumbers">RollNumbers Present</label>
                    <textarea name="rollNumbers" rows="5" required placeholder="just upload images, this field filled will be filled automatically." >
                        {[...new Set(recognitionOutput)].join(",")}
                    </textarea>
                </div>
                <button className="login-register-btn">Save Attendance</button>
            </form>
        )
    }
    return (
        <>
            <Navbar />
            <div className="login-register-main-container">
                <div className="login-register-content">
                    <div className="login-register-content-1">
                        <h1>Take Attendance</h1>
                        <p>Lorem ipsum dolor sit amet.</p>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. <a href="#">Iusto, repellendus!</a></p>
                        <div className="images-upload-container">
                            <input type="file" multiple onChange={studentImageChangeHandler} />
                        </div>

                    </div>
                    <div className="login-register-content-2">
                        {added && <p className="error-message status">{`Marked Attendance Sucessfully !`}</p>}
                        {UI}
                    </div>
                </div>
            </div>
            <Footer />
        </>

    )
}

export default TakeAttendancePage
