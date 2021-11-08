import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";
import Spinner from "../components/Spinner/Spinner";

import Navbar from '../components/Navbar/Navbar';
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
            <div id="container" className="container-register">
                <div className="form-wrap">
                    <h3>Register Portal</h3>
                    {error && <p className="error-message">{error}</p>}
                    {loading ? <Spinner />
                        :
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
                <footer>
                    <p>Already have an account? <Link to="/login">Login Here</Link></p>
                </footer>
            </div>
        </>
    )
}

export default RegisterPage
