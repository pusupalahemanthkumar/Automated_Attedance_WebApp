import React, { useEffect, useState } from 'react';
import * as faceapi from '@vladmandic/face-api';
import axios from "axios";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

import Navbar from '../components/Navbar/Navbar';
import Spinner from "../components/Spinner/Spinner"
import { loadLabeledImages, loadFaceApiModels, faceRecogintionOutput } from "../utils/FaceApiUtils"
import RecognitionOutputDisplayer from '../components/RecognitionOutputDisplayer/RecognitionOutputDisplayer';
import AttendanceAddModal from '../components/AttendanceAddModal/AttendanceAddModal';

const formatYmd = date => date.toISOString().slice(0, 10);

const TakeAttendancePage = () => {
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const [recognitionOutput, setRecognitionOutput] = useState([]);
    const [status, setStatus] = useState("Initial");
    const [subject, setSubject] = useState("");

    useEffect(() => {
        loadFaceApiModels();
    }, [])

    const studentImageChangeHandler = async (e) => {
        setStatus("Processing");
        console.log("--------Started Face Recognition Process !----------");
        const labeledFaceDescriptors = await loadLabeledImages()
        const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
        console.log("----------Trained Model Loaded------------");
        const data = await faceRecogintionOutput(e.target.files, faceMatcher)
        setRecognitionOutput(data);
        setStatus("Fetched");
    }
    const addAttendanceHandler = async (e) => {
        e.preventDefault();
        const query = {
            subject: subject,
            rollNumbers: ["Test", "Sushant"],
            date: formatYmd(new Date())
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
            <RecognitionOutputDisplayer
                recognitionOutput={recognitionOutput}
                onOpenModal={onOpenModal}
            />
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
                <AttendanceAddModal
                    addAttendanceHandler={addAttendanceHandler}
                    setSubject={setSubject}
                />
            </Modal>

        </>

    )
}

export default TakeAttendancePage
