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
            for (let i = 1; i <= 10; i++) {
                const img = await faceapi.fetchImage(`https://raw.githubusercontent.com/pusupalahemanthkumar/Automated_Attedance_WebApp/main/Storage/${label}/${i}.jpg`)
                const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
                descriptions.push(detections.descriptor)
            }

            return new faceapi.LabeledFaceDescriptors(label, descriptions)
        })
    )

}

