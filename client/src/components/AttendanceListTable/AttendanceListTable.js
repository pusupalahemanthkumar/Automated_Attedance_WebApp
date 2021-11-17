import React from 'react'

const formatYmd = date => date.toISOString().slice(0, 10);
const AttendanceListTable = ({ data }) => {
    return (
        <>
            <table className="attendance-table">
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
                                <tr key={row.rollNumber + row.date + row.subject}>
                                    <td>{formatYmd(new Date(row.date))}</td>
                                    <td>{row.rollNumber}</td>
                                    <td>{row.subject}</td>
                                    <td>{row.isPresent ? "Present " : "Absent "} <i className="fas fa-pen-square primary-color"></i></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default AttendanceListTable
