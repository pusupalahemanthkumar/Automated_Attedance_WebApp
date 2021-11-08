import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { login } from "../actions/userActions";
import Spinner from "../components/Spinner/Spinner";
import Navbar from "../components/Navbar/Navbar";
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
            <div id="container">
                <div className="form-wrap">
                    <h3>Login Portal</h3>
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
                <footer>
                    <p>Don't have an account? <Link to="/register">Register Here</Link></p>
                </footer>
            </div>
        </>
    )
}

export default LoginPage
