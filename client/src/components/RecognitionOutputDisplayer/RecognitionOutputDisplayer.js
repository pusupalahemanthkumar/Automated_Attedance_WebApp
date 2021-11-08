import React from 'react'

const RecognitionOutputDisplayer = ({ recognitionOutput, onOpenModal }) => {
    return (
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

export default RecognitionOutputDisplayer;
