import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";
import Spinner from "../components/Spinner/Spinner";

import Navbar from '../components/Navbar/Navbar';

const RegisterPage = ({ history }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");
    const [rollNumber, setRollNumber] = useState("");
    const [course, setCourse] = useState("");
    const [year, setYear] = useState("");

    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);

    const { userInfo } = userLogin;
    const { loading, error } = useSelector((state) => state.userRegister);

    useEffect(() => {
        if (userInfo) {
            history.push("/attendance")
        }
    }, [history, userInfo])

    const submitHandler = (e) => {
        e.preventDefault();
        setRole("student");
        const data = {
            name,
            email,
            password,
            role,
            rollNumber,
            course,
            year,
        };
        dispatch(register(data));
    }

    let UI;
    if (loading) {
        UI = <Spinner />
    } else {
        UI = (
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="rollNumber">RollNumber</label>
                    <input
                        type="text"
                        name="rollNumber"
                        id="rollNumber"
                        onChange={(e) => setRollNumber(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="year">B.tech Year</label>
                    <input
                        type="text"
                        name="year"
                        id="year"
                        onChange={(e) => setYear(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="course">B.tech course</label>
                    <input
                        type="text"
                        name="course"
                        id="course"
                        onChange={(e) => setCourse(e.target.value)}
                    />
                </div>
                <button className="btn">Register</button>
            </form>

        );
    }


    return (
        <>
            <Navbar />
            <div id="container" className="container-register">
                <div className="form-wrap">
                    <h3>Register Portal</h3>
                    {error && <p className="error-message">{error}</p>}
                    {UI}

                </div>
                <footer>
                    <p>Already have an account? <Link to="/login">Login Here</Link></p>
                </footer>
            </div>
        </>
    )
}

export default RegisterPage
