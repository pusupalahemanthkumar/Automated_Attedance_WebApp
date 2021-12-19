import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";
import Spinner from "../components/Spinner/Spinner";

import Navbar from '../components/Navbar/Navbar';
import Footer from "../components/Footer/Footer"
import RegisterForm from '../components/RegisterForm/RegisterForm';

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
    return (
        <>
            <Navbar />
            <div className="login-register-main-container">
                <div className="login-register-content">
                    <div className="login-register-content-1">
                        <h1>Register</h1>
                        <p>To Continue, register into the app</p>
                        <p>Welcome to Automated Attendance System - Progressive Web Application! Please carefully fill the registration form with accurate information. Also, please do not leave any blank space.</p>
                        <p>Already have an account ?<Link to="/login">Login</Link></p>

                    </div>
                    <div className="login-register-content-2">
                        {error && <p className="error-message">{error}</p>}
                        {
                            loading ?
                                <Spinner /> :
                                (
                                    <RegisterForm
                                        submitHandler={submitHandler}
                                        setName={setName}
                                        setRollNumber={setRollNumber}
                                        setEmail={setEmail}
                                        setPassword={setPassword}
                                        setYear={setYear}
                                        setCourse={setCourse}
                                    />

                                )
                        }

                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default RegisterPage
