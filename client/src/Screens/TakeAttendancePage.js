import React, { useEffect, useState } from 'react';
import * as faceapi from '@vladmandic/face-api';
import axios from "axios";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

import Navbar from '../components/Navbar/Navbar';
import Spinner from "../components/Spinner/Spinner"
import { loadLabeledImages, loadFaceApiModels } from "../utils/FaceApiUtils"


const TakeAttendancePage = () => {
    const output = []

    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const [recognitionOutput, setRecognitionOutput] = useState([]);
    const [status, setStatus] = useState("Initial");

    const [subject,setSubject]=useState("");


    useEffect(() => {
        loadFaceApiModels();
    }, [])

    const studentImageChangeHandler = async (e) => {
        setStatus("Processing");
        console.log(e.target.files.length);
        console.log("--------Started Face Recognition Process !----------")
        const labeledFaceDescriptors = await loadLabeledImages()
        const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
        console.log("----------Trained Model Loaded------------")
        for (let i = 0; i < e.target.files.length; i++) {
            const image = await faceapi.bufferToImage(e.target.files[i]);

            const displaySize = { width: image.width, height: image.height };

            const detections = await faceapi.detectAllFaces(image)
                .withFaceLandmarks()
                .withFaceDescriptors()

            console.log(detections.length)

            const resizedDetections = faceapi.resizeResults(detections, displaySize);
            const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))

            results.forEach((result, i) => {
                console.log(result._label)
                if (result._label !== "unknown") {
                    output.push(result._label)
                }
            });

        }

        setRecognitionOutput(output);
        setStatus("Fetched");
    }
    const addAttendanceHandler=async (e)=>{
        e.preventDefault();
        const query={
            subject:subject,
            rollNumbers:["Test","Sushant"]
        }
        console.log(query)
        const { data } = await axios.post(
            "http://localhost:5000/api/attendance/add-multiple",
            query,
        );
        console.log(data);

        
    }
    let UI;
    if (status === "Initial") {
        UI = <p>Please Take And Upload Image</p>
    } else if (status === "Processing") {
        UI = <Spinner />
    }
    else {
        UI = (
            <>
                <ul className="list-recognition-output">
                    {
                        recognitionOutput.map((p, idx) => {
                            return (
                                <li key={p + idx.toString()}>
                                    {p}
                                </li>
                            )
                        })
                    }
                </ul>
                <button className="take-attendance-btn" onClick={onOpenModal}>Proceed</button>
            </>
        )
    }
    return (
        <>
            <Navbar />
            <div className="container-take-attendance">
                <input type="file" name="studentImages" onChange={studentImageChangeHandler} multiple class="custom-file-input" />
            </div>
            <div className="container-recognition-faces">
                {UI}
            </div>
            <Modal open={open} onClose={onCloseModal} center>
                <div id="container-attendance-form">
                    <div className="form-wrap">
                        <form  onSubmit={addAttendanceHandler}>
                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    id="Subject"
                                    required
                                    onChange={(e)=>setSubject(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="course">Course</label>
                                <input
                                    type="text"
                                    name="Course"
                                    id="course"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="year">B.tech Year</label>
                                <input
                                    type="text"
                                    name="year"
                                    id="year"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn">Add Attendance</button>
                        </form>
                    </div>
                </div>


            </Modal>

        </>

    )
}

export default TakeAttendancePage
