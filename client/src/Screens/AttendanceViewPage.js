import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import Navbar from '../components/Navbar/Navbar';
import AttendanceListTable from "../components/AttendanceListTable/AttendanceListTable";
import Spinner from "../components/Spinner/Spinner";
import { getAttendance } from "../actions/attendanceAction";

const formatYmd = date => date.toISOString().slice(0, 10);
const AttendanceViewPage = ({ history }) => {
    const [date, setDate] = useState("");
    const [subject, setSubject] = useState("");

    const dispatch = useDispatch();
    const AttendanceListStore = useSelector((state) => state.attendanceListData);
    const { loading, error, AttendanceList } = AttendanceListStore;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo) {
            history.replace("/login");
            return;
        }
        if (userInfo && userInfo.role === "faculty") {
            setSubject(userInfo.subject)
        }
        if (userInfo.role === "student") {
            dispatch(getAttendance({ date: formatYmd(new Date()), rollNumber: userInfo.rollNumber }))
        } else {
            dispatch(getAttendance({ date: formatYmd(new Date()), subject: userInfo.subject }))
        }
    }, [userInfo, history, dispatch])

    const submitHandler = (e) => {
        e.preventDefault();
        let query;
        let t;
        if (date !== "") {
            query = {
                date
            }
        }
        if (subject !== "") {
            t = query;
            query = {
                ...t,
                subject: subject
            }
        }
        if (userInfo.role === "student") {
            t = query;
            query = {
                ...t,
                rollNumber: userInfo.rollNumber,
            }

        }
        dispatch(getAttendance(query));
        console.log(AttendanceListStore);

    }
    let UI = null;
    if (loading && !error) {
        UI = <Spinner />;

    } else if (error) {
        UI = <h1 className="text-center primary-color">{error}</h1>;
    }
    else {
        UI = (
            <AttendanceListTable data={AttendanceList} />
        )
    }
    return (
        <>
            <Navbar />
            <div className="container-date-filter-form">
                <form onSubmit={submitHandler} className="date-filter-form">
                    <div className="form-date-group">
                        <input
                            type="date"
                            placeholder="mm//dd/yy"
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    {
                        userInfo && userInfo.role === "student" ? (<div className="form-date-group">
                            <input
                                type="text"
                                placeholder="Enter Subject Name"
                                onChange={(e) => setSubject(e.target.value)}
                            />
                        </div>) : null
                    }
                    <button className="form-date-btn">Fetch</button>
                </form>
            </div>
            {UI}
        </>
    )
}

export default AttendanceViewPage
