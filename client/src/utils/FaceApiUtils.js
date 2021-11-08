import * as faceapi from '@vladmandic/face-api';

export const loadFaceApiModels = () => {
    Promise.all([
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
    ]).then(() => {
        console.log("------Loaded All Face API Models------")
    });
}

export const loadLabeledImages = () => {
    const labels = ['Hemanth Kumar', 'Neetha Reddy']
    return Promise.all(
        labels.map(async label => {
            const descriptions = []
            // i<=2 because of only 2 images 
            for (let i = 1; i <= 2; i++) {
                const img = await faceapi.fetchImage(`https://raw.githubusercontent.com/pusupalahemanthkumar/Automated_Attedance_WebApp/main/Storage/${label}/${i}.jpg`)
                const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
                descriptions.push(detections.descriptor)
            }

            return new faceapi.LabeledFaceDescriptors(label, descriptions)
        })
    )
}

export const faceRecogintionOutput = async (files,faceMatcher) => {
    const output = [];
    for (let x = 0; x < files.length; x++) {

        const image = await faceapi.bufferToImage(files[x]);
        const displaySize = { width: image.width, height: image.height };

        const detections = await faceapi.detectAllFaces(image)
            .withFaceLandmarks()
            .withFaceDescriptors()

        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))

        results.forEach((result, i) => {
            console.log(result._label)
            if (result._label !== "unknown") {
                output.push(result._label)
            }
        });
    }
    return output;
}

