import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import xlsExport from 'xlsexport';

import AttendanceListTable from "../components/AttendanceListTable/AttendanceListTable";
import Navbar from '../components/Navbar/Navbar';
import Footer from "../components/Footer/Footer";
import Spinner from "../components/Spinner/Spinner";
import { getAttendance } from "../actions/attendanceAction";

const formatYmd = date => date.toISOString().slice(0, 10);

const DashboardPage = ({ history }) => {

    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

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

    const updateAttendance = async (studData) => {
        console.log(studData);
        let URL;
        if (studData.isPresent) {
            URL = "/api/attendance/delete"
        } else {
            URL = "/api/attendance/add"
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${userInfo.token}`
            },
        };
        const { data } = await axios.post(
            URL,
            studData,
            config
        );
        if (userInfo.role === "student") {
            dispatch(getAttendance({ date: formatYmd(new Date()), rollNumber: userInfo.rollNumber }))
        } else {
            dispatch(getAttendance({ date: formatYmd(new Date()), subject: userInfo.subject }))
        }
    }

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
    const downloadHandler=async ()=>{
        const xls = new xlsExport(AttendanceList,"Attendance Log");
        xls.exportToXLS('AttendanceLogs.xls')
    }
    let UI = null;
    if (loading && !error) {
        UI = <Spinner />;

    } else if (error) {
        UI = <h1 className="text-center primary-color">{error}</h1>;
    }
    else {
        UI = (
            <AttendanceListTable data={AttendanceList} updateAttendance={updateAttendance} role={userInfo.role} />
        )
    }

    return (
        <>
            <Navbar />
            <div className="dashboard-main-container">
                <h1 className="dashboard-title">Attendance Summary</h1>
                <div className="dashboard-summary-container">
                    <div className="dashboard-summary-item">
                        <h1><i className="fas fa-book"></i> IOT</h1>
                        <span>10/12</span>
                        <p>Lorem, ipsum.</p>
                    </div>
                    <div className="dashboard-summary-item">
                        <h1><i className="fas fa-book"></i> DSA</h1>
                        <span>10/12</span>
                        <p>Lorem, ipsum.</p>
                    </div>
                    <div className="dashboard-summary-item">
                        <h1><i className="fas fa-book"></i> BD</h1>
                        <span>10/12</span>
                        <p>Lorem, ipsum.</p>
                    </div>
                    <div className="dashboard-summary-item">
                        <h1><i className="fas fa-book"></i> DS</h1>
                        <span>10/12</span>
                        <p>Lorem, ipsum.</p>
                    </div>
                </div>
                <div className="dashboard-attendance-logs-container">
                    <div className="dashboard-attendance-title-filter-container">
                        <h1>Attendance Logs</h1>
                        <button onClick={onOpenModal} >Apply Filters</button>
                    </div>
                    <div className="dashboard-attendance-logs-table-container">
                        {UI}
                    </div>
                </div>
            </div>
            <div className="download-report-container">
                <button onClick={downloadHandler}>Downolad Report</button>
            </div>
            <Modal open={open} onClose={onCloseModal} center>
                <div className="apply-filters-container">
                    <form className="login-register-form" onSubmit={submitHandler}>
                        <div className="form-group">
                            <label htmlFor="subject">Subject</label>
                            {
                                userInfo && userInfo.role === "faculty" ? (<input
                                    type="text"
                                    name="subject"
                                    placeholder="enter subject name (like DS/IOT/DSA/MS)"
                                    onChange={(e) => setSubject(e.target.value)}
                                    value={subject}
                                    readOnly
                                />) : (<input
                                    type="text"
                                    name="subject"
                                    placeholder="enter subject name (like DS/IOT/DSA/MS)"
                                    onChange={(e) => setSubject(e.target.value)}
                                    value={subject}
                                />)
                            }

                        </div>
                        <div className="form-group">
                            <label htmlFor="date">Start Date</label>
                            <input
                                type="date"
                                name="date"
                                placeholder="choose date"
                                onChange={(e) => setDate(e.target.value)}
                                value={date}
                            />
                        </div>
                        <button className="login-register-btn">Apply</button>
                    </form>
                </div>
            </Modal>
            <Footer />

        </>
    )
}

export default DashboardPage
