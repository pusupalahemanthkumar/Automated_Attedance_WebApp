import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../actions/userActions";
import Spinner from "../components/Spinner/Spinner";


import Navbar from "../components/Navbar/Navbar";

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
    },[history,userInfo])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }
    let UI;
    if (loading) {
        UI = <Spinner />
    } else {
        UI = (
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn">Login</button>
            </form>

        )

    }

    return (
        <>
            <Navbar />
            <div id="container">
                <div className="form-wrap">
                    <h3>Login Portal</h3>
                    {error && <p className="error-message">{error}</p>}
                    {UI}
                </div>
                <footer>
                    <p>Don't have an account? <Link to="/register">Register Here</Link></p>
                </footer>
            </div>
        </>
    )
}

export default LoginPage
