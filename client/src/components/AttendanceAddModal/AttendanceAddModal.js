import React from 'react'

const AttendanceAddModal = ({addAttendanceHandler,setSubject,rollNumbers}) => {
    return (
        <div id="container-attendance-form">
            <div className="form-wrap">
                <form onSubmit={addAttendanceHandler}>
                    <div className="form-group">
                        <label htmlFor="subject">Subject</label>
                        <input
                            type="text"
                            name="subject"
                            id="Subject"
                            required
                            onChange={(e) => setSubject(e.target.value)}
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
                    <div className="form-group">
                        <label htmlFor="year">Roll Numbers :</label>
                        <textarea>
                           {rollNumbers.join(", ")}
                        </textarea>
                    </div>
                    <button type="submit" className="btn">Add Attendance</button>
                </form>
            </div>
        </div>
    )
}

export default AttendanceAddModal
