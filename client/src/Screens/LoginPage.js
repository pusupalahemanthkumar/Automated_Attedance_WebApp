import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { login } from "../actions/userActions";
import Spinner from "../components/Spinner/Spinner";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer"
import LoginForm from '../components/LoginForm/LoginForm';

const LoginPage = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            history.push("/attendance")
        }
    }, [history, userInfo])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }
    return (
        <>
            <Navbar />
            <div className="login-register-main-container">
                <div className="login-register-content login-specific">
                    <div className="login-register-content-1">
                        <h1>Login</h1>
                        <p>Welcome Back to Attendance App</p>
                        <p> Not a member yet ? <Link to="/register"> Register</Link></p>

                    </div>
                    <div className="login-register-content-2">
                        {error && <p className="error-message">{error}</p>}
                        {
                            loading ?
                                <Spinner /> :
                                (
                                    <LoginForm
                                        submitHandler={submitHandler}
                                        setEmail={setEmail}
                                        setPassword={setPassword}
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

export default LoginPage
