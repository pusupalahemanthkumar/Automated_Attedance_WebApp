import React from 'react'

const RegisterForm = ({submitHandler,setName,setRollNumber,setEmail,setPassword,setYear,setCourse}) => {
    return (
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
    )
}

export default RegisterForm
