import React from 'react'

const AttendanceListTable = ({ data }) => {
    return (
        <div className="container-subject-attendance-list">
            <table className="subject-attendance-list-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>RollNumber </th>
                        <th>Subject</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.map((row) => {
                            return (
                                <tr key={row.rollNumber+row.date+row.subject}>
                                    <td>{row.date}</td>
                                    <td>{row.rollNumber}</td>
                                    <td>{row.subject}</td>
                                    <td>{row.isPresent ?"Present " :"Absent "} <i className="fas fa-pen-square primary-color"></i></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </div>
    )
}

export default AttendanceListTable
