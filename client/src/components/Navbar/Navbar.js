import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";

const Navbar = () => {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const disptach = useDispatch();
    const history = useHistory();

    const [mobileViewNavClass, setMobileViewNavClass] = useState(
        "mobile-nav-links"
    );
    const mobileMenuHandler = () => {
        if (mobileViewNavClass === "mobile-nav-links") {
            setMobileViewNavClass("mobile-nav-links display-menu")
        } else {
            setMobileViewNavClass("mobile-nav-links")
        }
    }

    const logoutHandler = () => {
        disptach(logout());
        history.replace("/");
    };

    return (
        <>
            <nav className="navbar">
                <div className="logo">
                    <h1><span className="primary-color-1"> <i className="fas fa-calendar-check secondary-color-2"></i> Attendance App</span>
                    </h1>
                </div>
                <ul className="nav-links">
                    <li><Link to="/">About</Link></li>
                    {
                        (userInfo && userInfo.role == "faculty") ? (<li><Link to="/take-attendance">Take Attendance</Link></li>) : null
                    }
                    {
                        userInfo && (
                            <>
                                <li><Link to="/attendance">Dashboard</Link></li>
                                <li><Link to="" onClick={logoutHandler}>logout</Link></li>
                            </>

                        )
                    }


                    {
                        !userInfo && (
                            <>
                                <li><Link to="/login">Login</Link></li>
                                <li><Link to="/register">Register</Link></li>
                            </>
                        )
                    }

                </ul>
                <i className="fas fa-bars menu-bar" onClick={mobileMenuHandler}></i>
            </nav>
            <ul className={mobileViewNavClass}>
                <li><Link to="/">About</Link></li>
                {
                    (userInfo && userInfo.role == "faculty") ? (<li><Link to="/take-attendance">Take Attendance</Link></li>) : null
                }
                {
                    userInfo && (
                        <>
                            <li><Link to="/attendance">Dashboard</Link></li>
                            <li><Link to="" onClick={logoutHandler}>logout</Link></li>
                        </>

                    )
                }


                {
                    !userInfo && (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </>
                    )
                }

            </ul>
        </>
    )
}

export default Navbar
