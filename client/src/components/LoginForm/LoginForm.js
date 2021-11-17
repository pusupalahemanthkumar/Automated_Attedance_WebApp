import React from 'react'

const LoginForm = ({ submitHandler, setPassword, setEmail }) => {
    return (
        <form className="login-register-form" onSubmit={submitHandler}>
            <div className="form-group">
                <label for="email">Email</label>
                <input
                    type="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="test@cvsr.ac.in"
                />
            </div>
            <div className="form-group">
                <label for="password">Password</label>
                <input
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="enter password"
                />
            </div>
            <button className="login-register-btn">Login</button>
        </form>
    )
}

export default LoginForm
