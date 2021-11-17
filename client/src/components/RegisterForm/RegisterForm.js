import React from 'react'

const RegisterForm = ({ submitHandler, setName, setRollNumber, setEmail, setPassword, setYear, setCourse }) => {
    return (

        <form className="login-register-form" onSubmit={submitHandler}>
            <div className="form-group">
                <label for="name">Name</label>
                <input type="text" name="name" onChange={(e) => setName(e.target.value)} required placeholder="enter name" />
            </div>
            <div className="form-group">
                <label for="rollNumber">rollNumber</label>
                <input type="text" name="rollNumber" onChange={(e) => setRollNumber(e.target.value)} required placeholder="enter rollnumber" />
            </div>
            <div className="form-group">
                <label for="course">Course</label>
                <input type="text" name="course" onChange={(e) => setCourse(e.target.value)} required placeholder="enter course (like CSE/ECE)" />
            </div>
            <div className="form-group">
                <label for="year">Year</label>
                <input type="number" name="year" onChange={(e) => setYear(e.target.value)} required placeholder="enter b.tech year (like 1/2/3/4)" min="1" max="4" />
            </div>
            <div className="form-group">
                <label for="email">Email</label>
                <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} required placeholder="test@cvsr.ac.in" />
            </div>
            <div className="form-group">
                <label for="password">Password</label>
                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} required placeholder="enter password" />
            </div>
            <button className="login-register-btn">Register</button>
        </form>
    )
}

export default RegisterForm
