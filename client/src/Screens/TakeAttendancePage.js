import React, { useEffect, useState } from 'react';
import * as faceapi from '@vladmandic/face-api';

import Navbar from '../components/Navbar/Navbar';
import Spinner from "../components/Spinner/Spinner"
import { loadLabeledImages, loadFaceApiModels } from "../utils/FaceApiUtils"


const TakeAttendancePage = () => {
    const [recognitionOutput, setRecognitionOutput] = useState([]);
    const [status, setStatus] = useState("Initial");

    useEffect(() => {
        loadFaceApiModels();
    }, [])

    const studentImageChangeHandler = async (e) => {
        setStatus("Processing");
        console.log("--------Started Face Recognition Process !----------")
        const labeledFaceDescriptors = await loadLabeledImages()
        const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
        console.log("----------Trained Model Loaded------------")

        const image = await faceapi.bufferToImage(e.target.files[0]);

        const displaySize = { width: image.width, height: image.height };

        const detections = await faceapi.detectAllFaces(image)
            .withFaceLandmarks()
            .withFaceDescriptors()

        console.log(detections.length)

        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
        const output = []
        results.forEach((result, i) => {
            console.log(result._label)
            if (result._label !== "unknown") {
                output.push(result._label)
            }
        });
        setRecognitionOutput(output);
        console.log(recognitionOutput)
        setStatus("Fetched");
    }
    let UI;
    if (status==="Initial") {
        UI = <p>Please Take And Upload Image</p>
    } else if(status==="Processing"){
        UI=<Spinner />
    }
    else{
        UI = (
            <>
                <ul className="list-recognition-output">
                    {
                        recognitionOutput.map((p) => {
                            return (
                                <li key={p}>
                                    {p}
                                </li>
                            )
                        })
                    }
                </ul>
                <button className="take-attendance-btn">Mark Present</button>
            </>

        )
    }
    return (
        <>
            <Navbar />
            <div className="container-take-attendance">
                <input type="file" name="studentImages" onChange={studentImageChangeHandler} />
            </div>
            <div className="container-recognition-faces">
                {UI}
            </div>

        </>

    )
}

export default TakeAttendancePage
