import React from 'react'

const LoginForm = ({ submitHandler, setPassword, setEmail }) => {
    return (
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

export default LoginForm
